import { store } from "../store/store.js";
import { COUPON_CONFIG } from "../config/coupon.config.js";
import { COUPON_STATUS } from "../constants/couponStatus.js";
import { generateCouponIfEligible } from "../utils/coupon.util.js";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js";

/*
Checkout & Coupon Flow (Global Nth order):

1. User initiates checkout (couponCode optional)
2. Validate cart exists and is not empty
3. Create order items as a snapshot from cart
4. If couponCode provided → validate coupon and apply discount (then mark USED)
5. Create order and push to store.orders
6. Determine global order number using store.orders.length
7. If this is Nth order → generate a new coupon (not applied to this order)
8. Clear cart
9. Return order + newly generated coupon (if any)
*/

export const checkout = (req, res, next) => {
  try {
    const { userId, couponCode } = req.body;

    // 1. Fetch cart
    const cart = store.carts.find(c => c.userId === userId);
    if (!cart || cart.items.length === 0) {
      const err = new Error("Cart is empty");
      err.statusCode = 400;
      throw err;
    }

    // 2. Build order items snapshot
    const orderId = store.orders.length + 1;

    const orderItems = cart.items.map((ci, idx) => {
      const product = store.products.find(p => p.id === ci.productId);
      if (!product) {
        const err = new Error(`Product not found for productId=${ci.productId}`);
        err.statusCode = 404;
        throw err;
      }

      const orderItemId = Number(`${orderId}${idx + 1}`);

      return new OrderItem(
        orderItemId,
        product.id,
        product.name,
        product.price,
        ci.quantity
      );
    });

    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    // 3. Apply coupon if provided
    let discount = 0;
    let appliedCouponCode = null;

    if (couponCode) {
      const coupon = store.coupons.find(c => c.code === couponCode);

      if (!coupon || coupon.status !== "ACTIVE") {
        const err = new Error("Invalid or expired coupon");
        err.statusCode = 400;
        throw err;
      }

      discount = (subtotal * COUPON_CONFIG.DISCOUNT_PERCENT) / 100;
      appliedCouponCode = coupon.code;
      coupon.status = COUPON_STATUS.USED;
    }

    const total = subtotal - discount;

    // 4. Create and persist order
    const order = new Order(
      orderId,
      userId,
      orderItems,
      subtotal,
      discount,
      total,
      appliedCouponCode
    );

    store.orders.push(order);

    // 5. Global order number = orders.length
    const orderNumber = store.orders.length;

    // 6. Generate coupon if eligible (Nth order)
    const newCoupon = generateCouponIfEligible(store, orderNumber);

    // 7. Clear cart
    cart.items = [];
    cart.subtotal = 0;

    // 8. Response
    const response = { order };

    if (newCoupon) {
      response.newCoupon = newCoupon;
    }

    return res.status(201).json(response);

  } catch (err) {
    next(err);
  }
};
