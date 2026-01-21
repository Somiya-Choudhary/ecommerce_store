import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products.api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Products</h2>

      <ul>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: "12px" }}>
            <strong>{product.name}</strong> – ₹{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
