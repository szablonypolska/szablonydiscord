import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@repo/shared';

@Injectable()
export class BasicOfferHandler {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  @OnEvent('pucharsed_successfull_basic')
  async handleBasic(payload: { code: string }) {
    try {
      const dataOrder = await this.prisma.client.order.findUnique({
        where: { orderCode: payload.code },
      });

      await this.prisma.client.templates.delete({
        where: { slugUrl: dataOrder.slugUrl },
      });

      await this.prisma.client.$transaction([
        this.prisma.client.order.update({
          where: { orderCode: payload.code },
          data: {
            status: 'COMPLETED',
          },
        }),
        this.prisma.client.orderEvent.create({
          data: {
            status: 'COMPLETED',
            orderCode: payload.code,
          },
        }),
      ]);
    } catch (err) {
      console.log(err);
    }
  }
}
