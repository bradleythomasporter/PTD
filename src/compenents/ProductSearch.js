// src/components/ProductSearch.js
import React, { useState } from 'react';

const ProductSearch = ({ onSearch }) => {
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(20); // Default 20 miles

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(zipCode, radius);
  };

  return (
    <div className="product-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
        <select 
          value={radius} 
          onChange={(e) => setRadius(e.target.value)}
        >
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="20">20 miles</option>
          <option value="50">50 miles</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};