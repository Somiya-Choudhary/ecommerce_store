import { store } from "../store/store.js";
import { COUPON_CONFIG } from "../config/coupon.config.js";
import { generateCouponIfEligible } from "../utils/coupon.util.js";


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

/**
 * Generates a coupon only if the current global order number
 * satisfies the Nth-order condition.
 *
 * Note / Assumption:
 * - The assignment does not explicitly specify whether the admin
 *   coupon generation API should be idempotent or restricted to
 *   a single coupon per Nth order.
 * - Based on this, it is assumed that the admin API is allowed
 *   to generate duplicate coupons for the same Nth order.
 * - This behavior is intentional to support manual testing
 *   and administrative operations, without impacting the
 *   automatic coupon generation during checkout.
 */
export const generateCouponIfEligibleAdmin = (req, res, next) => {
  try {
    const orderNumber = store.orders.length;

    if (orderNumber === 0) {
      const err = new Error("No orders placed yet. Coupon cannot be generated.");
      err.statusCode = 400;
      throw err;
    }

    // Condition: every Nth order
    const eligible =
      orderNumber % COUPON_CONFIG.COUPON_INTERVAL === 0;

    if (!eligible) {
      return res.status(200).json({
        eligible: false,
        message: `Coupon is generated only on every ${COUPON_CONFIG.COUPON_INTERVAL}th order.`,
        currentOrderNumber: orderNumber
      });
    }

    // Admin is allowed to generate duplicate coupons
    // for the same Nth order (intentional behavior).
    const coupon = generateCouponIfEligible(store, orderNumber);

    if (!coupon) {
      const err = new Error("Coupon was eligible but could not be generated.");
      err.statusCode = 500;
      throw err;
    }

    return res.status(201).json({
      eligible: true,
      message: "Coupon generated successfully.",
      currentOrderNumber: orderNumber,
      coupon
    });
  } catch (err) {
    next(err);
  }
};

