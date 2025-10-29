import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentsDto } from '../dto/create-payments.dto';
import { PrismaService } from '@repo/shared';
import { Offer } from '../../../interfaces/offer.interface';
import { getDiscountPrice } from 'src/common/utils/discount/getDiscountPrice';
import { FinalPrice } from 'src/interfaces/discount.interface';
import ShortUniqueId from 'short-unique-id';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from 'src/notifications/services/notifications.service';

@Injectable()
export class CreatePaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
    private readonly notification: NotificationsService,
  ) {
    this.stripe = new Stripe(
      configService.get<string>('SECRET_API_KEY_STRIPE'),
    );
  }
  private uid = new ShortUniqueId({ dictionary: 'number', length: 3 });
  private hostname: string = this.configService.get<string>('HOSTNAME');
  private stripe: Stripe;

  async createPayments(create: CreatePaymentsDto) {
    const uniqueId = this.uid.rnd();
    try {
      const user = await this.prisma.client.user.findUnique({
        where: { userId: create.userId },
      });

      if (!user) {
        throw new BadRequestException({ ok: false, message: 'No user found' });
      }

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

      try {
        finalProductPrice = await getDiscountPrice(create.promoCode, products);
      } catch (err) {
        throw err;
      }

      const paymentLink = await this.createStripeSession(
        finalProductPrice.priceAfterDiscount || finalProductPrice.price,
        uniqueId,
      );

      await this.createOrder(
        uniqueId,
        create.userId,
        finalProductPrice,
        create.promoCode,
      );

      this.notification.sendNotification({
        type: 'SUCCESS',
        title: `Zlozono zamowienie ${uniqueId}`,
        description: `Zamowienie ${uniqueId} zostalo pomyslnie utworzone`,
        userId: create.userId,
      });

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
      success_url: `${this.hostname}/order/${orderId}/success`,
      cancel_url: `${this.hostname}/payments/{CHECKOUT_SESSION_ID}`,
    });
  }

  private async createOrder(
    id: string,
    userId: string,
    finalProductPrice: FinalPrice,
    promoCode?: string,
  ) {
    console.log(finalProductPrice.products);

    try {
      await this.prisma.client.order.create({
        data: {
          id,
          userId,
          promoCodeId: promoCode || null,
          events: {
            create: {
              status: 'NEW',
            },
          },
          products: {
            create: finalProductPrice.products.map((product) => ({
              offerId: product.id,
              price: product.price,
              priceAfterDiscount: product.priceAfterDiscount,
            })),
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
