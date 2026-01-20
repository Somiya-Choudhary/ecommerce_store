// Domain model representing a completed order.
// Order is immutable once created and serves as a historical business record.
// In a production setup, this would map to an Order table.
export class Order {
  constructor(
    id,
    userId,
    items,
    subtotal,
    discount,
    total,
    couponCode = null
  ) {
    this.id = id;                   // number: primary key (orderId)
    this.userId = userId;           // number: user foreign key

    // Stored as a snapshot to preserve historical accuracy. Can be null if no coupon applied
    this.couponCode = couponCode;   // string | null

    this.items = items;             // OrderItem[]: snapshot of purchased items
    this.subtotal = subtotal;       // number: sum of item line totals before discount
    this.discount = discount;       // number: discount amount applied
    this.total = total;             // number: final payable amount
    this.createdAt = new Date();    // Date: order creation timestamp
  }
}
