import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { VerifyPromoCodeDto } from '../dto/verify-promo-code.dto';
import { offerList } from 'src/common/constants/offerList.constans';

@Injectable()
export class VerifyPromoCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async verifyPromoCode(promoCodeBody: VerifyPromoCodeDto) {
    try {
      const offer = offerList(promoCodeBody.offer);

      if (!offer) throw new BadGatewayException('This option is not avaiable');

      const checkPromocode = await this.prisma.client.promoCode.findUnique({
        where: { code: promoCodeBody.code },
      });

      if (!checkPromocode)
        throw new NotFoundException('This promocode is not avaiable');

      const newPrice =
        offer.price - (offer.price * checkPromocode.discount) / 100;

      if (checkPromocode.usageCount >= checkPromocode.maxUsageCount)
        throw new BadGatewayException({
          message: 'exceeded usage count limit',
          type: 'exceededLimit',
        });

      if (checkPromocode.discount !== 100 && newPrice < 2.5)
        throw new BadGatewayException({
          message: "'Minimal price is 2.00 PLN'",
          type: 'lowPrice',
        });

      return {
        newPrice,
        differencePrice: Math.abs(offer.price - newPrice).toFixed(2),
        percentDiscount: checkPromocode.discount,
        code: promoCodeBody.code,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
