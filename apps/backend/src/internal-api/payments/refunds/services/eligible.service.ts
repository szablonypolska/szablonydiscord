import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EligibleDto } from '../dto/eligible.dto';
import { PrismaService } from '@repo/shared';
import { Order } from '../../../../interfaces/order.interface';
import { differenceInDays } from 'date-fns';
import { selectEligibleProducts } from 'src/common/utils/selectEligibleProducts';

@Injectable()
export class EligibleService {
  constructor(private readonly prisma: PrismaService) {}

  async getEligibleRefunds(data: EligibleDto) {
    try {
      const order: Order | null = await this.prisma.client.order.findUnique({
        where: { id: data.orderId },
        include: {
          products: {
            include: { offer: true, protections: true },
          },
          events: { orderBy: { dateCreate: 'desc' }, take: 1 },
          promoCode: true,
        },
      });

      if (!order) {
        throw new NotFoundException({ ok: false, message: 'No order found' });
      }

      if (order.events[0].status !== 'PAID') {
        throw new BadGatewayException({
          ok: false,
          refundableProducts: [],
        });
      }

      const protections = order.products.flatMap((p) => p.protections || []);

      if (order.products.length === 0 || protections.length === 0) {
        throw new BadGatewayException({
          ok: false,
          refundableProducts: [],
        });
      }

      const selectedToRefund = selectEligibleProducts(order);

      const isExpired =
        differenceInDays(new Date(), new Date(order.dateCreate)) > 7;

      if (isExpired) {
        throw new BadGatewayException({
          ok: false,
          refundableProducts: [],
        });
      }

      return { ok: true, refundableProducts: selectedToRefund };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
