// Domain model representing a single line item within an order.
// OrderItem is immutable and captures a snapshot of product details at checkout time.
// In a production setup, this would map to an OrderItem table.
export class OrderItem {
  constructor(id, productId, name, unitPrice, quantity) {
    this.id = id;                 // number: primary key (orderItemId)
    this.productId = productId;   // number: product foreign key
    this.name = name;             // string: product name snapshot at checkout
    this.unitPrice = unitPrice;   // number: unit price snapshot
    this.quantity = quantity;     // number: quantity ordered
    this.totalPrice = unitPrice * quantity; // number: line total
  }
}
