import { COUPON_CONFIG } from "../config/coupon.config.js";

// Domain model representing a discount coupon.
// Coupon is generated as a business consequence of every Nth order.
// In a production setup, this would map to a Coupon table.
export class Coupon {
  constructor(id, code, generatedAtOrder) {
    this.id = id;                       // number: primary key (couponId)
    this.code = code;                   // string: unique coupon code
    this.discountPercent = COUPON_CONFIG.DISCOUNT_PERCENT; 
    this.generatedAtOrder = generatedAtOrder; // number
    this.status = "ACTIVE";             // string: ACTIVE | USED
  }
}
