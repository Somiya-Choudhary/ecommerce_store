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
