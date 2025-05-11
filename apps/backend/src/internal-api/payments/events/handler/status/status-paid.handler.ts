import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@repo/shared';
import { MailService } from 'src/mail/services/mail.service';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class StatusPaidHandler {
  constructor(
    private prisma: PrismaService,
    private readonly mailService: MailService,
    private configService: ConfigService,
    private websocket: WebsocketGateway,
  ) {}

  @OnEvent('order_paid', { async: true, promisify: true })
  async handleBasic(payload: { code: string; promoCode: string }) {
    try {
      const dataOrder = await this.prisma.client.order.findUnique({
        where: { orderCode: payload.code },
      });

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

      await this.mailService.sendPaidEmail(
        'karol.krawczyk205@gmail.com',
        payload.code,
        'TheProShizer',
        dataOrder.offer,
        (dataOrder.orderAmount / 100).toFixed(2),
        '23',
        '23',
        `${this.configService.get('HOSTNAME')}/order/${payload.code}`,
        '23',
        '2',
      );

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

      this.websocket.server.emit('order_status', {
        status: 'PAID',
        orderCode: payload.code,
        events: { date: new Date(), status: 'PAID' },
      });

      console.log('poszlo');
    } catch (err) {
      console.log(err);
    }
  }
}
