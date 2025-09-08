import { DiscountProduct } from 'src/interfaces/discount.interface';

export const discountHelper = (price: number, checkCode: DiscountProduct) => {
  if (checkCode.type === 'PERCENTAGE') {
    return Math.round(price * (1 - checkCode.discount / 100));
  } else {
    return Math.round(price - checkCode.discount);
  }
};
