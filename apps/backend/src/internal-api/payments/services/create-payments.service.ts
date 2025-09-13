import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentsDto } from '../dto/create-payments.dto';
import { PrismaService } from '@repo/shared';
import { Offer } from '../../../interfaces/offer.interface';
import { getDiscountPrice } from 'src/common/utils/discount/getDiscountPrice';
import { FinalPrice } from 'src/interfaces/discount.interface';
import ShortUniqueId from 'short-unique-id';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreatePaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      configService.get<string>('SECRET_API_KEY_STRIPE'),
    );
  }
  private uid = new ShortUniqueId({ dictionary: 'number', length: 3 });
  private hostname: string = this.configService.get<string>('HOSTNAME');
  private stripe: Stripe;

  async createPayments(create: CreatePaymentsDto) {
    try {
      let finalProductPrice: FinalPrice = {
        id: '',
        price: 0,
        priceAfterDiscount: 0,
        products: [],
      };
      const products: Offer[] = await this.prisma.client.offer.findMany({
        where: { id: { in: create.item } },
      });

      if (products.length === 0)
        throw new BadRequestException({
          ok: false,
          message: 'No products found',
        });

      const uniqueId = this.uid.rnd();

      await this.createOrder(uniqueId, create.userId);

      try {
        finalProductPrice = await getDiscountPrice(
          create.promoCode,
          products,
          uniqueId,
        );
      } catch (err) {
        throw err;
      }

      console.log(finalProductPrice);

      const paymentLink = await this.createStripeSession(
        finalProductPrice.priceAfterDiscount || finalProductPrice.price,
        uniqueId,
      );

      return { ok: true, paymentLink: paymentLink.url };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private async createStripeSession(amount: number, orderId: string) {
    const price = await this.stripe.prices.create({
      unit_amount: amount,
      currency: 'pln',
      product: 'prod_S8ABOWqGVSN6MD',
      metadata: { orderId },
    });
    return this.stripe.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
      metadata: { orderId },
      payment_intent_data: { metadata: { orderId } },
      mode: 'payment',
      success_url: `${this.hostname}/payments/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.hostname}/payments/{CHECKOUT_SESSION_ID}`,
    });
  }

  private async createOrder(id: string, userId: string) {
    try {
      await this.prisma.client.order.create({
        data: {
          id,
          userId,
          events: {
            create: {
              status: 'NEW',
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
