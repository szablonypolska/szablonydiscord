import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@repo/shared';

@Injectable()
export class StatusPaidHandler {
  constructor(private prisma: PrismaService) {}

  @OnEvent('order_paid')
  async handleBasic(payload: { code: string }) {
    console.log(payload);
    try {
      await this.prisma.client.order.update({
        where: { orderCode: payload.code },
        data: {
          status: 'PAID',
        },
      });

      await this.prisma.client.orderEvent.create({
        data: {
          orderCode: payload.code,
          status: 'PAID',
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
