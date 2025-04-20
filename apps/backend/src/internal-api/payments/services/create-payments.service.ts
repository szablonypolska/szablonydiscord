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

@Injectable()
export class CreatePayments {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}
  private stripe = new Stripe(
    this.configService.get<string>('SECRET_API_KEY_STRIPE'),
  );
  private hostname = this.configService.get<string>('HOSTNAME');

  private priceAfterPrototion: number = null;
  private uid = new ShortUniqueId({
    dictionary: 'number',
    length: 3,
  });

  async createPayments(create: CreatePaymentsDto) {
    try {
      const checkOffer = offerList(create.offer);
      const orderCode = this.uid.rnd();

      if (!checkOffer) throw new BadRequestException('There is not such offer');

      const checkUserIsExists = await this.prisma.client.user.findUnique({
        where: { userId: create.userId },
      });

      if (!checkUserIsExists)
        throw new UnauthorizedException('You are not login');

      if (create.code) {
        const checkCode = await this.prisma.client.promoCode.findUnique({
          where: { code: create.code },
        });

        if (!checkCode)
          throw new BadRequestException('This promocode no exists');

        this.priceAfterPrototion =
          checkOffer.price - (checkOffer.price * checkCode.discount) / 100;
      }

      const price = await this.stripe.prices.create({
        unit_amount: this.priceAfterPrototion
          ? Math.floor(this.priceAfterPrototion * 100)
          : Math.floor(checkOffer.price * 100),
        currency: 'pln',
        product: 'prod_S8ABOWqGVSN6MD',
        metadata: {
          orderCode: orderCode,
        },
      });

      const createSession = await this.stripe.checkout.sessions.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        metadata: {
          orderCode: orderCode,
          offer: create.offer,
        },
        payment_intent_data: {
          metadata: {
            orderCode: orderCode,
          },
        },
        mode: 'payment',
        success_url: `${this.hostname}/payments/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.hostname}/payments/{CHECKOUT_SESSION_ID}`,
      });

      await this.prisma.client.$transaction([
        this.prisma.client.order.create({
          data: {
            orderCode: orderCode,
            offer: create.offer,
            orderAmount: this.priceAfterPrototion
              ? this.priceAfterPrototion
              : checkOffer.price,
            userId: checkUserIsExists.userId,
            orderPaymentLink: createSession.url,
          },
        }),
        this.prisma.client.orderEvent.create({
          data: {
            orderCode: orderCode,
            status: 'NEW',
          },
        }),
      ]);

      return { paymentLink: createSession.url };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
