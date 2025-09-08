import { Offer } from '../../../interfaces/offer.interface';
import { prisma } from '@repo/db';
import {
  FinalPrice,
  DiscountProduct,
} from '../../../interfaces/discount.interface';
import { discountHelper } from './discountHelper';
import { BadRequestException } from '@nestjs/common';

let finalProductPrice: FinalPrice = {
  id: '',
  price: 0,
  priceDiscount: 0,
  products: [],
};

const calculateFinalPrice = (
  price: number,
  title: string,
  checkCode: DiscountProduct,
  productIsPromo: boolean,
  offerId?: string
) => {
  const promoPrice = discountHelper(price, checkCode);

  finalProductPrice.price += price;
  finalProductPrice.priceDiscount += productIsPromo ? promoPrice : price;
  finalProductPrice.products = [
    ...finalProductPrice.products,
    {
      id: offerId,
      title: title,
      priceAfter: price,
      priceBefore: productIsPromo
        ? checkCode.scope === 'CART'
          ? null
          : promoPrice || null
        : null,
    },
  ];
};

export const getDiscountPrice = async (
  promoCode: string,
  products: Offer[],
) => {
  finalProductPrice = { id: '', price: 0, priceDiscount: 0, products: [] };
  try {
    const checkCode: DiscountProduct = await prisma.promoCode.findUnique({
      where: { code: promoCode },
      include: {
        promoProducts: { include: { offer: true } },
      },
    });

    if (!checkCode)
      throw new BadRequestException({
        ok: false,
        message: 'Promo code not found',
      });

    if (checkCode.usageCount > checkCode.maxUsageCount)
      throw new BadRequestException({
        ok: false,
        message: 'Promo code usage limit reached',
      });

    if (checkCode.scope === 'CART') {
      products.forEach((product) => {
        calculateFinalPrice(product.price, product.title, checkCode, false);
      });
      const promoPrice = discountHelper(finalProductPrice.price, checkCode);

      finalProductPrice.priceDiscount = promoPrice;

      return finalProductPrice;
    }

    products.forEach((products) => {
      const promoProducts = checkCode.promoProducts.some(
        (item) => item.offerId === products.id,
      );

      if (!promoProducts) {
        calculateFinalPrice(products.price, products.title, checkCode, false, products.id);
        return finalProductPrice;
      }

      calculateFinalPrice(products.price, products.title, checkCode, true, products.id);
    });

    return finalProductPrice;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
