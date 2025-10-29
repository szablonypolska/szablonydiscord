import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { RefundDto } from '../dto/refund.dto';
import { Order, Products } from '../../../../interfaces/order.interface';
import { selectEligibleProducts } from 'src/common/utils/selectEligibleProducts';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class RefundService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      configService.get<string>('SECRET_API_KEY_STRIPE'),
    );
  }

  private stripe: Stripe;

  async processRefund(data: RefundDto) {
    try {
      const order: Order | null = await this.prisma.client.order.findUnique({
        where: { id: data.orderId },
        include: {
          products: { include: { offer: true, protections: true } },
          promoCode: true,
          events: { orderBy: { dateCreate: 'desc' }, take: 1 },
        },
      });
      if (!order) {
        throw new NotFoundException({ ok: false, message: 'No order found' });
      }
      if (order.userId !== data.userId) {
        throw new NotFoundException({
          ok: false,
          message: "This order doesn't belong to you",
        });
      }

      const eligibleStatuses = [
        'PARTIALLY_REFUNDED',
        'REFUNDED',
        'REFUND_PENDING',
      ];

      if (eligibleStatuses.includes(order.events[0].status)) {
        throw new BadGatewayException({
          ok: false,
          message: 'Order is not eligible for refund',
        });
      }

      const protections = order.products.flatMap((p) => p.protections || []);

      if (protections.length === 0) {
        throw new BadGatewayException({
          ok: false,
          message: 'No protections in database',
        });
      }
      const selectedToRefund = selectEligibleProducts(order);

      const productToRefound = selectedToRefund
        .map((product) => {
          const selectProduct = data.orderProductIds.filter(
            (id) => id === product.offerId,
          );

          return selectProduct.length > 0 ? product : null;
        })
        .filter((p) => p !== null);

      if (selectedToRefund.length === 0) {
        throw new BadGatewayException({
          ok: false,
          message: 'No protections eligible for refund',
        });
      }

      if (data.orderProductIds.length !== productToRefound.length) {
        throw new BadGatewayException({
          ok: false,
          message: 'Some protections are not eligible for refund',
        });
      }

      const priceToRefund = this.calculateFinallPriceToRefund(productToRefound);

      await this.prisma.client.orderEvent.create({
        data: { orderId: order.id, status: 'REFUND_PENDING' },
      });

      const test = await this.createRefund(
        order.paymentIntentId,
        priceToRefund,
        productToRefound,
      );

      console.log(test);

      return { ok: true, amount: priceToRefund };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private calculateFinallPriceToRefund(products: Products[]) {
    let total = 0;
    products.forEach((products) => {
      total += products.refundPrice || 0;
    });

    return total;
  }

  private async createRefund(
    orderId: string,
    amount: number,
    products: Products[],
  ) {
    try {
      const refund = await this.stripe.refunds.create({
        amount,
        payment_intent: orderId,
        metadata: { products: products.map((p) => p.id).join(', ') },
        reason: 'requested_by_customer',
      });

      return refund;
    } catch (err) {
      console.log(err);
    }
  }
}
