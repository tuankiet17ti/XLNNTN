import React, { useState } from "react";
import AddAmazonURLForm from "./AddAmazonURLForm";
import api from "../api";

const ProductSummary = () => {
  const [description, setDescription] = useState({ about: "", reviews: "" });

  const fetchAmazonSummary = async (amazonUrl) => {
    try {
      setDescription({ about: "Generating description...", reviews: "" });

      await api.post("/summary", { name: amazonUrl });
      const response = await api.get("/summary");
      const product = response.data.products?.[0];

      if (product && product.name) {
        const fullText = product.name || "";
        const aboutStart = fullText.indexOf("About this item");
        const reviewsStart = fullText.indexOf("Top reviews:");

        let aboutText = "";
        let reviewsText = "";

        if (aboutStart !== -1 && reviewsStart !== -1) {
          aboutText = fullText.substring(aboutStart, reviewsStart).trim();
          reviewsText = fullText.substring(reviewsStart).trim();

          // Xoá tiêu đề nếu trùng lặp
          aboutText = aboutText.replace(/^About this item\s*/i, "");
          reviewsText = reviewsText.replace(/^Top reviews:\s*/i, "");
        } else {
          aboutText = fullText.trim();
        }

        setDescription({
          about: aboutText,
          reviews: reviewsText,
        });
      } else {
        setDescription({ about: "No description found.", reviews: "" });
      }
    } catch (error) {
      console.error("Error fetching description:", error);
      setDescription({
        about: "Failed to generate description.",
        reviews: "",
      });
    }
  };

  return (
    <div className="container">
      <h1>Amazon Product Description Generator</h1>
      <AddAmazonURLForm onSubmit={fetchAmazonSummary} />

      {description.about && (
        <div className="result">
          <h3>About this item:</h3>
          <div className="description-block">
            {description.about
              .split("\n")
              .filter((line) => line.trim())
              .map((line, index) => (
                <p className="description-paragraph" key={index}>
                  {line.trim()}
                </p>
              ))}
          </div>

          {description.reviews && (
            <>
              <h3 style={{ marginTop: "20px" }}>Top Reviews:</h3>
              <div className="review-list">
                {description.reviews
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line, index) => (
                    <div className="review-card" key={index}>
                      {line.trim()}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSummary;
