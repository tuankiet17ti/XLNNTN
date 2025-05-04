import React, { useState } from "react";
import AddAmazonURLForm from "./AddAmazonURLForm";
import api from "../api";

const ProductSummary = () => {
  const [description, setDescription] = useState("");

  const fetchAmazonSummary = async (amazonUrl) => {
    try {
      setDescription("Generating description...");
      await api.post("/summary", { name: amazonUrl });

      const response = await api.get("/summary");
      const product = response.data.products?.[0];

      if (product && product.name) {
        setDescription(product.name); // `name` chứa mô tả do backend tạo
      } else {
        setDescription("No description found.");
      }
    } catch (error) {
      console.error("Error fetching description:", error);
      setDescription("Failed to generate description.");
    }
  };

  return (
    <div className="container">
      <h1>Amazon Product Description Generator</h1>
      <AddAmazonURLForm onSubmit={fetchAmazonSummary} />

      {description && (
        <div className="result">
          <h3>Generated Description:</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductSummary;
