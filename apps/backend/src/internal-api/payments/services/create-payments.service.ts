import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentsDto } from '../dto/create-payments.dto';
import { offerList } from 'src/common/constants/offerList.constans';
import { PrismaService } from '@repo/shared';

@Injectable()
export class CreatePayments {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}
  private stripe = new Stripe(
    this.configService.get<string>('SECRET_API_KEY_STRIPE'),
  );

  private priceAfterPrototion: number = null;

  async createPayments(create: CreatePaymentsDto) {
    try {
      const checkOffer = offerList(create.offer);

      if (!checkOffer) throw new BadRequestException('There is not such offer');
      if (create.code) {
        const checkCode = await this.prisma.client.promoCode.findUnique({
          where: { code: create.code },
        });

        if (!checkCode)
          throw new BadRequestException('This promocode no exists');

        this.priceAfterPrototion =
          checkOffer.price - (checkOffer.price * checkCode.value) / 100;
      }

      const price = await this.stripe.prices.create({
        unit_amount: this.priceAfterPrototion
          ? this.priceAfterPrototion * 100
          : checkOffer.price * 100,
        currency: 'pln',
        product: 'prod_S8ABOWqGVSN6MD',
      });

      const createSession = await this.stripe.checkout.sessions.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `https://szablonydiscord.pl?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://szablonydiscord.pl/cancel`,
      });

      return { paymentLink: createSession.url };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
