
import { store } from "./store.js";
import { Product } from "../models/product.model.js";

// Seed dummy users
export function seedUsers() {
  store.users.push(
    { id: 1, name: "Luffy" },
    { id: 2, name: "Robin" }
  );
}

// Seed product catalog
export function seedProducts() {
  const products = [
    new Product(1, "MacBook Pro", 200000),
    new Product(2, "iPhone 15", 80000),
    new Product(3, "AirPods Pro", 25000),
    new Product(4, "Apple Watch", 45000),
    new Product(5, "Mechanical Keyboard", 12000),
    new Product(6, "Wireless Mouse", 3000),
    new Product(7, "27-inch Monitor", 35000),
    new Product(8, "USB-C Hub", 5000),
    new Product(9, "External SSD", 15000),
    new Product(10, "Noise Cancelling Headphones", 22000)
  ];

  store.products.push(...products);
}
