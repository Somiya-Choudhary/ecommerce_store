// Domain model representing a user's shopping cart.
// `id` is used as the cart identity in-memory.
// In a production setup, this would map to a Cart table.
export class Cart {
  constructor(id, userId) {
    this.id = id;         // number: cart primary key
    this.userId = userId; // number: user foreign key
    this.items = [];      // [{ productId, quantity }] Or Can be other Object cartItem
    this.subtotal = 0;    // calculated by cart service
  }
}
