import React, { useState } from 'react';
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
      image: 'https://via.placeholder.com/100?text=Broccoli',
    },
    {
      description: 'cup cooked beans, peas or lentils',
      quantity: '0.5',
      kJ: '300',
      image: 'https://via.placeholder.com/100?text=Beans+or+Peas',
    },
    {
      description: 'cup of green leafy or raw salad vegetables',
      quantity: '1',
      kJ: '300',
      image: 'https://via.placeholder.com/100?text=Salad+Vegetables',
    },
    {
      description: 'cup of sweetcorn',
      quantity: '0.5',
      kJ: '300',
      image: 'https://via.placeholder.com/100?text=Sweetcorn',
    },
    {
      description: 'medium potato, sweet potato, taro or cassava',
      quantity: '0.5',
      kJ: '300',
      image: 'https://via.placeholder.com/100?text=Potato',
    },
    {
      description: 'medium tomato',
      quantity: '1',
      kJ: '300',
      image: 'https://via.placeholder.com/100?text=Tomato',
    },
  ];

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : vegetablePages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < vegetablePages.length - 1 ? prev + 1 : 0));
  };

  // Render placeholder content when data is not available
  const vegetableServes = data?.vegetable ? parseFloat(data.vegetable) : 0;

  // Calculate total kJ (vegetable serves * 300 kJ per serve) or default to 0
  const totalKJ = vegetableServes * 300;

  // Calculate the text for the current page, or use placeholder
  const currentQuantity = vegetableServes * parseFloat(vegetablePages[currentPage].quantity);
  const pageText = vegetableServes
    ? `${currentQuantity} ${vegetablePages[currentPage].description}`
    : 'Placeholder text for vegetables.';

    return (
      <div className="card">
        {/* Title bar */}
        <div className="title-bar">
          <h3>Vegetables</h3>
          {/* Display the calculated total kJ or 0 if no data */}
          <span>Total kJ: {totalKJ || '0'}</span>
        </div>
  
        {/* Content area: Description and Image */}
        <div className="content">
          {/* Description text */}
          <div className="content-text">
            <p>{pageText}</p>
          </div>
          {/* Image */}
          <div className="content-image">
            <img
              src={vegetablePages[currentPage].image}
              alt={vegetablePages[currentPage].description}
              className="card-image"
            />
          </div>
        </div>
  
        {/* Button area */}
        <div className="card-buttons">
          <button className="switch-button left" onClick={handleSwitchLeft}>⮜</button>
          <button className="switch-button right" onClick={handleSwitchRight}>⮞</button>
        </div>
      </div>
    );
};

export default VegetablesCard;
