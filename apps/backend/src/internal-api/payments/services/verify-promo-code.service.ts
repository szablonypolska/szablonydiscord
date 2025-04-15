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

      const newPrice = offer.price - (offer.price * checkPromocode.value) / 100;

      return {
        newPrice,
        differencePrice: Math.abs(offer.price - newPrice).toFixed(2),
        percentDiscount: checkPromocode.value,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
