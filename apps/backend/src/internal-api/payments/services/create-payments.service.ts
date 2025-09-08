import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentsDto } from '../dto/create-payments.dto';
import { PrismaService } from '@repo/shared';
import { Offer } from '../../../interfaces/offer.interface';
import { getDiscountPrice } from 'src/common/utils/discount/getDiscountPrice';
import { FinalPrice } from 'src/interfaces/discount.interface';

@Injectable()
export class CreatePaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayments(create: CreatePaymentsDto) {
    try {
      let finalProductPrice: FinalPrice = {
        id: '',
        price: 0,
        priceDiscount: 0,
        products: [],
      };
      const products: Offer[] = await this.prisma.client.offer.findMany({
        where: { id: { in: create.item } },
      });

      if (products.length === 0)
        throw new BadRequestException({
          ok: false,
          message: 'No products found',
        });

      try {
        finalProductPrice = await getDiscountPrice(create.promoCode, products);
      } catch (err) {
        throw err;
      }

      console.log(finalProductPrice);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
