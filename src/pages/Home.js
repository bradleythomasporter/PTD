// src/pages/Home.js or where you display products
import React, { useState, useEffect } from 'react';
import ProductSearch from '../components/ProductSearch';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (zipCode, radius) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5001/api/products/nearby?zipCode=${zipCode}&radius=${radius}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Error fetching nearby products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ProductSearch onSearch={handleSearch} />
      
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Grower: {product.grower.businessName}</p>
            {/* Add other product details */}
          </div>
        ))}
      </div>
    </div>
  );
};