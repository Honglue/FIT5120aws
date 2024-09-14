import React, { useState, useEffect } from 'react';
import './Recommend.css';

// Define the prop types for the card component
interface VegetablesCardProps {
  data: { 
    vegetable?: string; 
    fruit?: string; 
    grain?: string; 
    'lean meat'?: string; 
    milk?: string 
  } | null; // Allow null since the data could be unavailable initially
}

const VegetablesCard: React.FC<VegetablesCardProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Hardcoded pages for different vegetable types (use as an example for the page content)
  const vegetablePages = [
    {
      description: 'cup of cooked broccoli, spinach, carrots or pumpkin',
      quantity: '0.5',
      kJ: '300',
    },
    {
      description: 'cup cooked beans, peas or lentils',
      quantity: '0.5',
      kJ: '300',
    },
    {
      description: 'cup of green leafy or raw salad vegetables',
      quantity: '1',
      kJ: '300',
    },
    {
      description: 'cup of sweetcorn',
      quantity: '0.5',
      kJ: '300',
    },
    {
      description: 'medium potato, sweet potato, taro or cassava',
      quantity: '0.5',
      kJ: '300',
    },
    {
      description: 'medium tomato',
      quantity: '1',
      kJ: '300',
    },
  ];

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : vegetablePages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < vegetablePages.length - 1 ? prev + 1 : 0));
  };

  // If data is not available yet, show loading or empty state
  if (!data || !data.vegetable) {
    return <p>Loading vegetable data...</p>;
  }

  // Calculate total kJ (vegetable serves * 300 kJ per serve)
  const totalKJ = parseFloat(data.vegetable) * 300;

  // Calculate the text for the current page
  const currentQuantity = parseFloat(vegetablePages[currentPage].quantity) * parseFloat(data.vegetable);
  const pageText = `${currentQuantity} ${vegetablePages[currentPage].description}`;

  return (
    <div className="card">
      <div className="title-bar">
        <h3>Vegetables</h3>
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

export default VegetablesCard;
