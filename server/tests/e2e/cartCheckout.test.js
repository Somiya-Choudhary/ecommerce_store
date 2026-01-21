import request from "supertest";
import { app } from "../../src/app.js";
import { store } from "../../src/store/store.js";
import { resetStore } from "../helpers/resetStore.js";

beforeEach(() => {
  resetStore();
});

describe("Cart APIs", () => {
  test("POST /api/cart/items should add item to cart and calculate subtotal", async () => {
    const response = await request(app)
      .post("/api/cart/items")
      .send({
        userId: 1,
        productId: 1,
        quantity: 2
      });

    expect(response.statusCode).toBe(200);

    // cart shape
    expect(response.body.userId).toBe(1);
    expect(response.body.items.length).toBe(1);

    // item details
    const item = response.body.items[0];
    expect(item.productId).toBe(1);
    expect(item.quantity).toBe(2);

    // subtotal = 2 * 200000
    expect(response.body.subtotal).toBe(400000);

    // verify store persistence
    const cartInStore = store.carts.find(c => c.userId === 1);
    expect(cartInStore).toBeTruthy();
    expect(cartInStore.subtotal).toBe(400000);
  });
});

describe("Checkout APIs", () => {
  test("POST /api/checkout should create order and clear cart", async () => {
    // 1. Add item to cart first
    await request(app)
      .post("/api/cart/items")
      .send({
        userId: 1,
        productId: 1,
        quantity: 2
      });

    // Sanity check: cart exists
    const cartBeforeCheckout = store.carts.find(c => c.userId === 1);
    expect(cartBeforeCheckout).toBeTruthy();
    expect(cartBeforeCheckout.items.length).toBe(1);

    // 2. Checkout
    const response = await request(app)
      .post("/api/checkout")
      .send({
        userId: 1
      });

    // 3. Response assertions
    expect(response.statusCode).toBe(201);

    const { order, newCoupon } = response.body;

    expect(order).toBeDefined();
    expect(order.userId).toBe(1);
    expect(order.items.length).toBe(1);
    expect(order.subtotal).toBe(400000);
    expect(order.discount).toBe(0);
    expect(order.total).toBe(400000);

    // No coupon expected for non-Nth order
    expect(newCoupon).toBeUndefined();

    // 4. Order persisted
    expect(store.orders.length).toBe(1);

    // 5. Cart cleared
    const cartAfterCheckout = store.carts.find(c => c.userId === 1);
    expect(cartAfterCheckout.items.length).toBe(0);
    expect(cartAfterCheckout.subtotal).toBe(0);
  });
});

