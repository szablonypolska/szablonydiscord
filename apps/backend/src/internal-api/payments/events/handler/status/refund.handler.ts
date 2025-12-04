import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Order, OrderStatus } from 'src/interfaces/order.interface';
import { NotificationsService } from 'src/notifications/services/notifications.service';

@Injectable()
export class RefundUpdatedHandler {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
    private notification: NotificationsService,
  ) {}

  @OnEvent('refund_updated', { async: true, promisify: true })
  async handleUpdateRefundStatus(payload: { orderId: string }) {
    try {
      const order: Order | null = await this.prisma.client.order.findUnique({
        where: { id: payload.orderId },
        include: {
          products: true,
        },
      });
      const notRefundedProducts = order?.products.reduce((acc, product) => {
        if (!product.refunded) {
          acc += 1;
        }
        return acc;
      }, 0);

      const data: { products: string[] | string; amount: number } =
        await this.cacheManager.get(`refund_${payload.orderId}`);
      const products: string[] = Array.isArray(data.products)
        ? data.products
        : data.products.split(',');

      for (const product of products) {
        await this.prisma.client.orderProduct.updateMany({
          where: { id: parseInt(product) },
          data: {
            refunded: true,
            refundedAmount: data.amount,
          },
        });
      }

      const statusType =
        notRefundedProducts !== products.length
          ? OrderStatus.PARTIALLY_REFUNDED
          : OrderStatus.REFUNDED;
      await this.prisma.client.orderEvent.create({
        data: { orderId: payload.orderId, status: statusType },
      });
      await this.cacheManager.del(`refund_${payload.orderId}`);
      this.notification.sendNotification({
        type: 'SUCCESS',
        title: 'Płatność zwrócona',
        description: `Zwrot został przetworzony dla zamówienia ${payload.orderId} pomyślnie.`,
        userId: order?.userId || '',
      });
    } catch (err) {
      console.log(err);
    }
  }
}
