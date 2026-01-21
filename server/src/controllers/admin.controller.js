import { store } from "../store/store.js";


/**
 * GET /api/admin/summary
 *
 * Returns:
 * - itemsPurchasedCount: total quantity purchased across all orders
 * - totalPurchaseAmount: sum of order.total across all orders
 * - discountCodes: list of all coupons (code + status + generatedAtOrder)
 * - totalDiscountAmount: sum of order.discount across all orders
 */
export const getAdminSummary = (req, res, next) => {
  try {
    const itemsPurchasedCount = store.orders.reduce((count, order) => {
      const orderQty = order.items.reduce((sum, item) => sum + item.quantity, 0);
      return count + orderQty;
    }, 0);

    const totalPurchaseAmount = store.orders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    const totalDiscountAmount = store.orders.reduce(
      (sum, order) => sum + order.discount,
      0
    );

    return res.status(200).json({
      itemsPurchasedCount,
      totalPurchaseAmount,
      discountCodes: store.coupons,
      totalDiscountAmount
    });
  } catch (err) {
    next(err);
  }
};
