import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { LoadCartDto } from '../dto/load-cart.dto';

@Injectable()
export class LoadCartOfferData {
  constructor(private prisma: PrismaService) {}

  async loadCartData(cartItems: LoadCartDto) {
    try {
      const checkIsArray = Array.isArray(cartItems.item)
        ? cartItems.item
        : [cartItems.item];

      const data = await this.prisma.client.offer.findMany({
        where: { id: { in: checkIsArray } },
      });

      if (checkIsArray.length !== data.length)
        throw new BadGatewayException({
          ok: false,
          message: 'Some items were not found',
        });

      return { ok: true, details: data || [] };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
