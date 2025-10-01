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

  return selectedToRefund;
};
