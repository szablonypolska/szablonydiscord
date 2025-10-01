import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@repo/shared';
import { MailService } from 'src/mail/services/mail.service';
import { Products } from 'src/interfaces/order.interface';

@Injectable()
export class StatusPaidHandler {
  constructor(
    private prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  @OnEvent('order_paid', { async: true, promisify: true })
  async handleBasic(payload: { orderId: string; paymentIntentId: string }) {
    try {
      const getOrder = await this.prisma.client.order.findUnique({
        where: { id: payload.orderId },
        include: { products: { include: { offer: true } } },
      });

      if (!getOrder) return;

      const dataEmail = getOrder.products.map((product: Products) => {
        return {
          title: product.offer.title,
          description: product.offer.description,
          price: product.offer.price / 100,
          priceAfterDiscount: product.priceAfterDiscount / 100,
        };
      });

      const totalPrice = getOrder.products.reduce(
        (acc: number, product: Products) => {
          return acc + (product.priceAfterDiscount || product.offer.price);
        },
        0,
      );

      await this.mailService.sendPaidEmail(
        'karol.krawczyk205@gmail.com',
        dataEmail,
        totalPrice / 100,
      );

      await this.prisma.client.$transaction([
        this.prisma.client.order.update({
          where: { id: getOrder.id },
          data: { paymentIntentId: payload.paymentIntentId },
        }),
        this.prisma.client.protection.createMany({
          data: getOrder.products.map((product: Products) => ({
            orderId: getOrder.id,
            type: product.offer.id.toUpperCase(),
          })),
        }),
        this.prisma.client.orderEvent.create({
          data: {
            orderId: getOrder.id,
            status: 'PAID',
          },
        }),
        this.prisma.client.cartItem.deleteMany({
          where: { userId: getOrder.userId },
        }),
      ]);
    } catch (err) {
      console.log(err);
    }
  }
}
