import React, { useState } from "react";
import AddAmazonURLForm from "./AddAmazonURLForm";
import api from "../api";

const ProductSummary = () => {
  const [description, setDescription] = useState({
    en: "",
    vi: "",
    reviews: "",
  });

  const fetchAmazonSummary = async (amazonUrl) => {
    try {
      setDescription({ en: "Generate Description", vi: "", reviews: "" });

      await api.post("/summary", { name: amazonUrl });
      const response = await api.get("/summary");
      const product = response.data.products?.[0];

      if (product && product.name) {
        const fullText = product.name || "";

        const viStart = fullText.indexOf("Về sản phẩm này");
        const reviewStart = fullText.indexOf("Top reviews:");

        let enText = "";
        let viText = "";
        let reviewsText = "";

        if (viStart !== -1) {
          enText = fullText.substring(0, viStart).trim();
        } else {
          enText = fullText.trim();
        }

        if (viStart !== -1 && reviewStart !== -1) {
          viText = fullText.substring(viStart, reviewStart).trim();
          reviewsText = fullText.substring(reviewStart).trim();

          viText = viText.replace(/^Về sản phẩm này\s*/i, "");
          reviewsText = reviewsText.replace(/^Top reviews:\s*/i, "");
        } else if (viStart !== -1) {
          viText = fullText.substring(viStart).trim();
          viText = viText.replace(/^Về sản phẩm này\s*/i, "");
        }

        setDescription({
          en: enText.replace(/^About this item\s*/i, ""),
          vi: viText,
          reviews: reviewsText,
        });
      } else {
        setDescription({ en: "Không tìm thấy mô tả.", vi: "", reviews: "" });
      }
    } catch (error) {
      console.error("Error fetching description:", error);
      setDescription({
        en: "Không thể tạo mô tả.",
        vi: "",
        reviews: "",
      });
    }
  };

  return (
    <div className="container">
      <h1>Amazon Product Description Generator</h1>
      <AddAmazonURLForm onSubmit={fetchAmazonSummary} />

      {(description.en || description.vi) && (
        <div className="result">
          {description.en && (
            <>
              <h3>About this item:</h3>
              <div className="description-block en-block">
                {description.en
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line, index) => (
                    <p className="description-paragraph" key={`en-${index}`}>
                      {line.trim()}
                    </p>
                  ))}
              </div>
            </>
          )}

          {description.vi && (
            <>
              <h3>Về sản phẩm này:</h3>
              <div className="description-block vi-block">
                {description.vi
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line, index) => (
                    <p className="description-paragraph" key={`vi-${index}`}>
                      {line.trim()}
                    </p>
                  ))}
              </div>
            </>
          )}

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
