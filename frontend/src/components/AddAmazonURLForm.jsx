import React, { useState } from "react";

function AddAmazonURLForm({ onSubmit }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      alert("Please enter an Amazon product URL.");
      return;
    }

    onSubmit(url);
    setUrl("");
  };

  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Amazon product URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="generate-button" type="submit">
        Generate
      </button>
    </form>
  );
}

export default AddAmazonURLForm;
