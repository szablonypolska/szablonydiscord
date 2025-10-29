export interface DiscountProduct {
  discount: number;
  type: 'PERCENTAGE' | 'AMOUNT';
  scope: 'PRODUCT' | 'CART';
  promoProductsId: string[];
  usageCount: number;
  maxUsageCount: number;
  code: string;
  promoProducts: PromoProducts[];
}



interface PromoProducts {
  offerId: string;
}

export interface FinalPrice {
  id: string;
  price: number;
  priceAfterDiscount?: number;
  products?: DiscountResultProduct[];
}

export interface DiscountResultProduct {
  id: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
}
