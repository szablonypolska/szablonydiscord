import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { CreatePromoCodeDto } from '../dto/create-promo-code.dto';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class CreatePromoCodeService {
  constructor(private readonly prisma: PrismaService) {}

  private uid = new ShortUniqueId({ length: 5 });

  async createPromoCode(data: CreatePromoCodeDto) {
    try {
      const isArray = Array.isArray(data.item) ? data.item : [data.item];

      const checkOffer = await this.prisma.client.offer.findMany({
        where: { id: { in: isArray } },
      });

      if (isArray.length !== checkOffer.length)
        throw new BadGatewayException({
          ok: false,
          message: 'Offer not found',
        });
        

      const baseData = {
        code: String(this.uid.rnd()),
        scope: data.scope,
        type: data.type,
        maxUsageCount: data.maxUsageCount,
        discount: data.discount,
      };

      await this.prisma.client.promoCode.create({
        data: {
          ...baseData,
          ...(data.scope === 'PRODUCT' && {
            promoProducts: {
              create: isArray.map((item) => ({
                offerId: item,
              })),
            },
          }),
        },
      });

      return { ok: true, message: 'Promo code created successfully' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
