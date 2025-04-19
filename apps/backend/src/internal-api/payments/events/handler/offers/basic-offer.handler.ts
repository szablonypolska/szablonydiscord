import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@repo/shared';

@Injectable()
export class BasicOfferHandler {
  constructor(private prisma: PrismaService) {}

  @OnEvent('pucharsed_successfull_basic')
  async handleBasic(payload: { code: string }) {
    try {
      await this.prisma.client.order.update({
        where: { orderCode: payload.code },
        data: {
          status: 'COMPLETED',
        },
      });

      await this.prisma.client.orderEvent.create({
        data: {
          status: 'COMPLETED',
          orderCode: payload.code,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
