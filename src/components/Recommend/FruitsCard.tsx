import React, { useState } from 'react';
import './Recommend.css';

// Define the prop types for the card component
interface FruitsCardProps {
  data: { 
    vegetable?: string; 
    fruit?: string; 
    grain?: string; 
    'lean meat'?: string; 
    milk?: string 
  } | null; // Allow null since the data could be unavailable initially
}

const FruitsCard: React.FC<FruitsCardProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Hardcoded pages for different fruit types (use as an example for the page content)
  const fruitPages = [
    {
      description: 'medium apple, banana, orange or pear',
      quantity: '1',
      kJ: '350',
    },
    {
      description: 'small apricots, kiwi fruits or plums',
      quantity: '2',
      kJ: '350',
    },
    {
      description: 'cup canned fruit with no added sugar',
      quantity: '1',
      kJ: '350',
    },
    {
      description: 'cup 100% fruit juice with no added sugar',
      quantity: '0.5',
      kJ: '350',
    },
  ];

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : fruitPages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < fruitPages.length - 1 ? prev + 1 : 0));
  };

  // If data is not available yet, show loading or empty state
  if (!data || !data.fruit) {
    return <p>Loading fruit data...</p>;
  }

  // Calculate total kJ (fruit serves * 350 kJ per serve)
  const totalKJ = parseFloat(data.fruit) * 350;

  // Calculate the text for the current page
  const currentQuantity = parseFloat(fruitPages[currentPage].quantity) * parseFloat(data.fruit);
  const pageText = `${currentQuantity} ${fruitPages[currentPage].description}`;

  return (
    <div className="card">
      <div className="title-bar">
        <h3>Fruits</h3>
        {/* Display the calculated total kJ */}
        <span>Total kJ: {totalKJ}</span>
      </div>

      {/* Content area with dynamically calculated text and placeholder image */}
      <div className="content-area">
        <button className="switch-button" onClick={handleSwitchLeft}>⮜</button>
        <div className="content">
          <div className="content-text">
            <p>{pageText}</p>
          </div>
          <div className="content-image">
            <img src="https://via.placeholder.com/100" alt="Placeholder" className="card-image" />
          </div>
        </div>
        <button className="switch-button" onClick={handleSwitchRight}>⮞</button>
      </div>
    </div>
  );
};

export default FruitsCard;
