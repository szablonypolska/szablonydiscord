import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@repo/shared';

@Injectable()
export class StatusPaidHandler {
  constructor(private prisma: PrismaService) {}

  @OnEvent('payment_created')
  async handleBasic(payload: { code: string }) {
    console.log(payload);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await this.prisma.client.order.update({
        where: { orderCode: payload.code },
        data: {
          status: 'PENDING',
        },
      });

      await this.prisma.client.orderEvent.create({
        data: {
          orderCode: payload.code,
          status: 'PENDING',
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
