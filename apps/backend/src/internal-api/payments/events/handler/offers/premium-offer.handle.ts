import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@repo/shared';

@Injectable()
export class PremiumOfferHandler {
  constructor(private prisma: PrismaService) {}

  @OnEvent('pucharsed_successfull_premium', { async: true, promisify: true })
  async handleBasic(payload: { code: string }) {
    try {
      const dataOrder = await this.prisma.client.order.findUnique({
        where: { orderCode: payload.code },
      });

      if (dataOrder.templateId) {
        await this.prisma.client.templates.delete({
          where: { templateId: dataOrder.templateId },
        });
      }

      await this.prisma.client.$transaction([
        this.prisma.client.reserveTemplate.create({
          data: { name: dataOrder.serverName },
        }),
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
