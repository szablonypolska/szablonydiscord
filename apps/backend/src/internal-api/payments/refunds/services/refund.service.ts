import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { RefundDto } from '../dto/refund.dto';
import { Order, Products } from '../../../../interfaces/order.interface';
import { selectEligibleProducts } from 'src/common/utils/selectEligibleProducts';

@Injectable()
export class RefundService {
  constructor(private prisma: PrismaService) {}

  async processRefund(data: RefundDto) {
    try {
      const order: Order | null = await this.prisma.client.order.findUnique({
        where: { id: data.orderId },
        include: {
          products: { include: { offer: true, protections: true },  },
        },
      });
      if (!order) {
        throw new NotFoundException({ ok: false, message: 'No order found' });
      }
      if (order.userId !== data.userId) {
        throw new NotFoundException({ ok: false, message: "This order doesn't belong to you" });
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

      return { ok: true, amount: priceToRefund };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private calculateFinallPriceToRefund(products: Products[]) {
    let total = 0;
    products.forEach((products) => {
      total += products.priceAfterDiscount || products.price;
    });

    const fee = total - (total * 25) / 100 - 125;

    return fee;
  }
}
