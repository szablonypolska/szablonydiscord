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

      if (checkPromocode.usageCount >= checkPromocode.maxUsageCount)
        throw new BadGatewayException({
          message: 'exceeded usage count limit',
          type: 'exceededLimit',
        });

      const newPrice =
        offer.price - (offer.price * checkPromocode.discount) / 100;

      if (newPrice < 2.5)
        throw new BadGatewayException({
          message: 'The order amount cannot be less than 2.50 zł',
          type: 'lowPrice',
        });

      return {
        percentDiscount: checkPromocode.discount,
        code: promoCodeBody.code,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
