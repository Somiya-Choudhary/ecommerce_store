import { store } from "../store/store.js";
import { Cart } from "../models/cart.model.js";

export const addItemToCart = (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if product exists
    const product = store.products.find(p => p.id === productId);
    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }

    // In production, the cart is lazily created on first add-to-cart
    // by querying for an active cart and inserting one if it doesn’t exist.
    // Uniqueness is typically enforced by the database.
    let cart = store.carts.find(c => c.userId === userId);

    if (!cart) {
      const cartId = store.carts.length + 1;
      cart = new Cart(cartId, userId);
      store.carts.push(cart);
    }

    // Add or update item in cart
    const existingItem = cart.items.find(
      item => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Recalculate subtotal
    cart.subtotal = cart.items.reduce((sum, item) => {
      const p = store.products.find(prod => prod.id === item.productId);
      return sum + p.price * item.quantity;
    }, 0);

    res.status(200).json(cart);
  } catch (err) {
    next(err); // Delegate error handling to centralized middleware
  }
};
