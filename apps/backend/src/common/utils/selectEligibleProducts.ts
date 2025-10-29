import { Order } from '../../interfaces/order.interface';

export const selectEligibleProducts = (order: Order) => {
  const selectedToRefund = order.products
    .map((product) => {
      const hasProtectionToRefund = product.protections.filter(
        (protection) => !protection.idServer && !protection.name,
      );

      if (hasProtectionToRefund.length > 0) {
        return {
          ...product,
        };
      }
      return null;
    })
    .filter((p) => p !== null);

  const totalPrice = selectedToRefund.reduce(
    (acc, product) => (acc += product.price),
    0,
  );

  const totalPriceAfterDiscount = selectedToRefund.map((product) => {
    if (order.promoCode && order.promoCode.scope === 'CART') {
      const totalDiscountValue = totalPrice * (order.promoCode.discount / 100);
      const productDiscount = totalDiscountValue * (product.price / totalPrice);
      const refundPrice = product.price - productDiscount;
      const refundPriceInZloty =
        (product.price / totalPrice) * order.promoCode.discount;

      return {
        ...product,
        refundPrice:
          order.promoCode.type === 'PERCENTAGE'
            ? Math.round(refundPrice)
            : Math.round(product.price - refundPriceInZloty),
      };
    }
    return {
      ...product,
      refundPrice: product.priceAfterDiscount || product.price,
    };
  });

  const priceAfterCommission = totalPriceAfterDiscount.map((product) => {
    const priceAfterCommission = product.refundPrice * (1 - 0.25) - 125;

    return {
      ...product,
      refundPrice: Math.round(priceAfterCommission),
    };
  });

  return priceAfterCommission;
};
