import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { VerifyPromoCodeDto } from '../dto/verify-promo-code.dto';

@Injectable()
export class VerifyPromoCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async verifyPromoCode(promoCodeBody: VerifyPromoCodeDto) {
    try {
      const checkPromocode = await this.prisma.client.promoCode.findUnique({
        where: { code: promoCodeBody.code },
        include: { promoProducts: true },
      });

      if (!checkPromocode)
        throw new NotFoundException({
          ok: false,
          message: 'promo code not found',
          type: 'notFound',
        });

      if (checkPromocode.usageCount >= checkPromocode.maxUsageCount)
        throw new BadGatewayException({
          ok: false,
          message: 'exceeded usage count limit',
          type: 'exceededLimit',
        });

      const promoProductsId = checkPromocode.promoProducts.map(
        (item: { offerId: string }) => {
          return item.offerId;
        },
      );

      return {
        ok: true,
        discount: checkPromocode.discount,
        discountType: checkPromocode.type,
        discountScope: checkPromocode.scope,
        promoProductsId: promoProductsId,
        code: promoCodeBody.code,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
