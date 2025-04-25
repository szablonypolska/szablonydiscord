import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentsDto } from '../dto/create-payments.dto';
import { offerList } from 'src/common/constants/offerList.constans';
import { PrismaService } from '@repo/shared';
import ShortUniqueId from 'short-unique-id';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CreatePayments {
  private stripe: Stripe;
  private hostname: string;
  private uid = new ShortUniqueId({ dictionary: 'number', length: 3 });

  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {
    this.stripe = new Stripe(
      configService.get<string>('SECRET_API_KEY_STRIPE'),
    );

    this.hostname = configService.get<string>('HOSTNAME');
  }

  async createPayments(dto: CreatePaymentsDto) {
    try {
      const offer = offerList(dto.offer);
      console.log(dto);
      if (!offer) throw new BadRequestException('There is no such offer');

      let templateData;

      const user = await this.prisma.client.user.findUnique({
        where: { userId: dto.userId },
      });

      if (dto.link) {
        templateData = await this.prisma.client.templates.findUnique({
          where: { slugUrl: dto.link.split(`${this.hostname}/templates/`)[1] },
        });
      }

      if (!user) throw new UnauthorizedException('You are not login');

      let finalPrice = offer.price;
      if (dto.code) {
        const promo = await this.prisma.client.promoCode.findUnique({
          where: { code: dto.code },
        });
        if (promo.usageCount >= promo.maxUsageCount)
          throw new BadRequestException('usage limit reached');
        if (!promo) throw new BadRequestException('Promocode is not exists');
        finalPrice = (offer.price * (100 - promo.discount)) / 100;
      }

      const orderCode = this.uid.rnd();
      const session =
        finalPrice > 0
          ? await this.createStripeSession(
              finalPrice,
              dto.offer,
              orderCode,
              dto.code,
            )
          : null;

      await this.prisma.client.$transaction([
        this.prisma.client.order.create({
          data: {
            orderCode,
            offer: dto.offer,
            orderAmount: finalPrice,
            userId: user.userId,
            orderPaymentLink: session?.url ?? '',
            templateId: templateData ? templateData.templateId : '',
            serverId: dto.offer === 'advanced' ? dto.serverId : null,
            serverName: dto.offer === 'premium' ? dto.serverName : null,
          },
        }),
        this.prisma.client.orderEvent.create({
          data: { orderCode, status: 'NEW' },
        }),
      ]);

      if (finalPrice === 0) {
        this.eventEmitter.emit('order_paid', {
          code: orderCode,
          promoCode: dto.code,
        });
        this.eventEmitter.emit(`pucharsed_successfull_${dto.offer}`, {
          code: orderCode,
        });
      }

      return { link: finalPrice === 0 ? `/order/${orderCode}` : session.url };
    } catch (err) {
      console.log(err);
    }
  }

  private async createStripeSession(
    amount: number,
    offer: string,
    orderCode: string,
    promoCode: string,
  ) {
    const price = await this.stripe.prices.create({
      unit_amount: Math.floor(amount * 100),
      currency: 'pln',
      product: 'prod_S8ABOWqGVSN6MD',
      metadata: { orderCode },
    });
    return this.stripe.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
      metadata: { orderCode, offer, promoCode },
      payment_intent_data: { metadata: { orderCode, promoCode } },
      mode: 'payment',
      success_url: `${this.hostname}/payments/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.hostname}/payments/{CHECKOUT_SESSION_ID}`,
    });
  }
}
