import React from 'react';
import './App.css';
import FruitList from './components/AmazonSummary';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Description Generator</h1>
      </header>
      <main>
        <FruitList />
      </main>
    </div>
  );
};

export default App;