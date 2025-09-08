export interface DiscountProduct {
    discount: number,
    discountType: 'PERCENTAGE' | 'AMOUNT',
    discountScope: 'PRODUCT' | 'CART',
    promoProductsId: string[],
    code: string,
}