// Domain model representing a product in the catalog.
// In-memory identity is `id`.
// In a production setup, this would map to a Product table.
export class Product {
  constructor(id, name, price) {
    this.id = id;        // number: product primary key
    this.name = name;    // string: product name
    this.price = price;  // number: unit price (server-trusted)
  }
}
