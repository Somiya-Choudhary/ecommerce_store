import crypto from "crypto";
import { Coupon } from "../models/coupon.model.js";
import { COUPON_CONFIG } from "../config/coupon.config.js";

/**
 * Utility responsible for coupon generation.
 *
 * Generates a coupon on every Nth order (global) based on COUPON_INTERVAL.
 * Coupon codes are generated randomly to avoid guessable patterns.
 *
 * This logic is extracted into a utility to keep controllers focused on
 * request/response flow and to allow future reuse.
 *
 * In a future enhancement, the same function can be reused by an admin API
 * to generate test or promotional coupon codes without duplicating logic.
 *
 * @param {object} store - in-memory store
 * @param {number} orderNumber - global order number (1-indexed)
 * @returns {Coupon|null} newly generated coupon or null if not eligible
 */
export const generateCouponIfEligible = (store, orderNumber) => {
  if (orderNumber % COUPON_CONFIG.COUPON_INTERVAL !== 0) {
    return null;
  }

  const code = `SAVE${COUPON_CONFIG.DISCOUNT_PERCENT}-${crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase()}`;

  const couponId = store.coupons.length + 1;

  const coupon = new Coupon(
    couponId,
    code,
    orderNumber
  );

  store.coupons.push(coupon);
  return coupon;
};
