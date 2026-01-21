import { store } from "../../src/store/store.js";
import { Product } from "../../src/models/product.model.js";

/**
 * Resets in-memory store between tests.
 * This simulates isolation normally provided by a database.
 */
export const resetStore = () => {
  store.products.length = 0;
  store.users.length = 0;
  store.carts.length = 0;
  store.orders.length = 0;
  store.coupons.length = 0;

  // seed products
  store.products.push(
    new Product(1, "Macbook Pro", 200000),
    new Product(2, "iPhone 15", 80000),
    new Product(3, "AirPods", 20000)
  );

  // seed dummy users
  store.users.push(
    { id: 1, name: "user1" },
    { id: 2, name: "user2" }
  );
};
