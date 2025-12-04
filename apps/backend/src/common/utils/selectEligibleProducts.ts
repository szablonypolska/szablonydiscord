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

  const checkIsRefunded = selectedToRefund.filter((p) => !p.refunded);

  const totalPriceAfterDiscount = checkIsRefunded.map((product) => {
    if (order.promoCode && order.promoCode.scope === 'CART') {
      const totalDiscountValue = totalPrice * (order.promoCode.discount / 100);
      const productDiscount = totalDiscountValue * (product.price / totalPrice);
      const refundedAmount = product.price - productDiscount;
      const refundedAmountInZloty =
        (product.price / totalPrice) * order.promoCode.discount;

      return {
        ...product,
        refundedAmount:
          order.promoCode.type === 'PERCENTAGE'
            ? Math.round(refundedAmount)
            : Math.round(product.price - refundedAmountInZloty),
      };
    }
    return {
      ...product,
      refundedAmount: product.priceAfterDiscount || product.price,
    };
  });

  const priceAfterCommission = totalPriceAfterDiscount.map((product) => {
    const priceAfterCommission = product.refundedAmount * (1 - 0.25) - 125;

    return {
      ...product,
      refundedAmount: Math.round(priceAfterCommission),
    };
  });

  return priceAfterCommission;
};
