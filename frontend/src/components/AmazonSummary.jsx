import React, { useState } from "react";
import api from "../api";

const AddAmazonURLForm = ({ onSubmit }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      alert("Please enter an Amazon product URL or specification.");
      return;
    }
    onSubmit(url);
  };

  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <div className="input-row">
        <textarea
          placeholder="Enter Amazon product URL or specification..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          rows={3}
          className="text-area"
        />
        <button className="generate-button" type="submit">
          Generate
        </button>
      </div>
    </form>
  );
};

const ProductSummary = () => {
  const [description, setDescription] = useState({
    en: "",
    vi: "",
    reviews: "",
  });
  const [showVietnamese, setShowVietnamese] = useState(false);

  const fetchAmazonSummary = async (amazonUrl) => {
    try {
      setDescription({ en: "Generating description...", vi: "", reviews: "" });

      await api.post("/summary", { name: amazonUrl });
      const response = await api.get("/summary");
      const product = response.data.products?.[0];

      if (product && product.name) {
        const fullText = product.name || "";
        const [enText, ...viParts] = fullText.split("\n");
        const viText = viParts.join("\n");

        setDescription({
          en: enText.trim(),
          vi: viText.trim(),
          reviews: "",
        });
      } else {
        setDescription({ en: "Description not found.", vi: "", reviews: "" });
      }
    } catch (error) {
      console.error("Error fetching description:", error);
      setDescription({
        en: "Error generating description.",
        vi: "",
        reviews: "",
      });
    }
  };

  return (
    <div className="container">
      <AddAmazonURLForm onSubmit={fetchAmazonSummary} />

      {(description.en || description.vi) && (
        <div className="result">
          {description.en && (
            <>
              <h3>Product Description</h3>
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
              <button
                className="toggle-button"
                onClick={() => setShowVietnamese((prev) => !prev)}
              >
                {showVietnamese
                  ? "Hide Vietnamese Description"
                  : "Show Vietnamese Description"}
              </button>
              {showVietnamese && (
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
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSummary;
