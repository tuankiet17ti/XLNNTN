import React, { useState } from 'react';

const AddAmazonURLForm = ({ addAmazonURL }) => {
  const [amazonUrl, setAmazonUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (amazonUrl) {
      addAmazonURL(amazonUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={amazonUrl}
        onChange={(e) => setAmazonUrl(e.target.value)}
        placeholder="Enter Amazon Product URL"
        style={{ width: '700px', padding: '10px', fontSize: '16px' }}
      />
      <button type="submit">Generate Caption</button>
    </form>
  );
};

export default AddAmazonURLForm;