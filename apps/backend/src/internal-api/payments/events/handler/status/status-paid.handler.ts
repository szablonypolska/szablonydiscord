import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@repo/shared';

@Injectable()
export class StatusPaidHandler {
  constructor(private prisma: PrismaService) {}

  @OnEvent('order_paid', { async: true, promisify: true })
  async handleBasic(payload: { code: string; promoCode: string }) {
    try {
      console.log(`zwraca`, payload);

      if (payload.promoCode) {
        await this.prisma.client.promoCode.update({
          where: { code: payload.promoCode },
          data: {
            usageCount: {
              increment: 1,
            },
          },
        });
      }

      await this.prisma.client.$transaction([
        this.prisma.client.order.update({
          where: { orderCode: payload.code },
          data: {
            status: 'PAID',
          },
        }),
        this.prisma.client.orderEvent.create({
          data: {
            orderCode: payload.code,
            status: 'PAID',
          },
        }),
      ]);
    } catch (err) {
      console.log(err);
    }
  }
}
