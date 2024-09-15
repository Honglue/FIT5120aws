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
      image: 'https://via.placeholder.com/100?text=Broccoli',
    },
    {
      description: 'small apricots, kiwi fruits or plums',
      quantity: '2',
      kJ: '350',
      image: 'https://via.placeholder.com/100?text=Broccoli',
    },
    {
      description: 'cup canned fruit with no added sugar',
      quantity: '1',
      kJ: '350',
      image: 'https://via.placeholder.com/100?text=Broccoli',
    },
    {
      description: 'cup 100% fruit juice with no added sugar',
      quantity: '0.5',
      kJ: '350',
      image: 'https://via.placeholder.com/100?text=Broccoli',
    },
  ];

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : fruitPages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < fruitPages.length - 1 ? prev + 1 : 0));
  };

  // Render placeholder content when data is not available
  const fruitServes = data?.fruit ? parseFloat(data.fruit) : 0;

  // Calculate total kJ (fruit serves * 350 kJ per serve) or default to 0
  const totalKJ = fruitServes * 350;

  // Calculate the text for the current page, or use placeholder
  const currentQuantity = fruitServes * parseFloat(fruitPages[currentPage].quantity);
  const pageText = fruitServes
    ? `${currentQuantity} ${fruitPages[currentPage].description}`
    : 'Placeholder text for fruits.';

    return (
      <div className="card">
        {/* Title Bar */}
        <div className="title-bar">
          <h3>Fruits</h3>
          {/* Display the calculated total kJ or 0 if no data */}
          <span>Total kJ: {totalKJ || '0'}</span>
        </div>
    
        {/* Content area */}
        <div className="content">
          {/* Description text */}
          <div className="content-text">
            <p>{pageText}</p>
          </div>
          {/* Image */}
          <div className="content-image">
            <img
              src={fruitPages[currentPage].image}
              alt={fruitPages[currentPage].description}
              className="card-image"
            />
          </div>
        </div>
    
        {/* Button area at the bottom */}
        <div className="card-buttons">
          <button className="switch-button left" onClick={handleSwitchLeft}>⮜</button>
          <button className="switch-button right" onClick={handleSwitchRight}>⮞</button>
        </div>
      </div>
    );
};

export default FruitsCard;
