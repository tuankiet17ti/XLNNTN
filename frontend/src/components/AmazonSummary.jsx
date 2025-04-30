import React, { useEffect, useState } from 'react';
import api from "../api.js";
import AddAmazonURLForm from './AddAmazonURLForm.jsx';

const ProductSummary = () => {
  const [products, setProducts] = useState([]);

  const fetchAmazonSummary = async () => {
    try {
      const response = await api.get('/summary');
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching summary", error);
    }
  };

  const addAmazonURL = async (amazonUrl) => {
    try {
      await api.post('/summary', { name: amazonUrl });
      fetchAmazonSummary();  // Refresh the list after adding a fruit
    } catch (error) {
      console.error("Error processing amazon product", error);
    }
  };

  useEffect(() => {
    fetchAmazonSummary();
  }, []);

  return (
    <div>
      <AddAmazonURLForm addAmazonURL={addAmazonURL} />
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSummary;