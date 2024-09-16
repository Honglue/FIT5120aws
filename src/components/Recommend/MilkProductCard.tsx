import React, { useState } from 'react';
import './Recommend.css';

// Define the prop types for the card component
interface MilkProductCardProps {
  data: { 
    vegetable?: string; 
    fruit?: string; 
    grain?: string; 
    'lean meat'?: string; 
    milk?: string 
  } | null; // Allow null since the data could be unavailable initially
}

const MilkProductCard: React.FC<MilkProductCardProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Hardcoded pages for different milk product types (use as an example for the page content)
  const milkPages = [
    {
      description: 'cup milk',
      quantity: '1',
      kJ: '600',
      image: '/images/recommend/milk1.jpg',
    },
    {
      description: 'slices hard cheese',
      quantity: '2',
      kJ: '600',
      image: '/images/recommend/milk2.jpg',
    },
    {
      description: 'cup yoghurt',
      quantity: '0.5',
      kJ: '600',
      image: '/images/recommend/milk3.jpg',
    },
    {
      description: 'cup soy beverage',
      quantity: '1',
      kJ: '600',
      image: '/images/recommend/milk4.jpg',
    },
  ];

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : milkPages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < milkPages.length - 1 ? prev + 1 : 0));
  };

  // Render placeholder content when data is not available
  const milkServes = data?.milk ? parseFloat(data.milk) : 0;

  // Calculate total kJ (milk serves * 600 kJ per serve) or default to 0
  const totalKJ = milkServes * 600;

  // Calculate the text for the current page, or use placeholder
  const currentQuantity = milkServes * parseFloat(milkPages[currentPage].quantity);
  const pageText = milkServes
    ? `${currentQuantity} ${milkPages[currentPage].description}`
    : 'input your age, gender, height and weight';

    return (
      <div className="card">
        {/* Title Bar */}
        <div className="title-bar">
          <h3>Milk Products</h3>
          {/* Display the calculated total kJ or 0 if no data */}
          <span>Total kJ: {totalKJ || '0'}</span>
        </div>
    
        {/* Content section */}
        <div className="content">
          {/* Description text */}
          <div className="content-text">
            <p>{pageText}</p>
          </div>
          {/* Image section */}
          <div className="content-image">
            <img
              src={milkPages[currentPage].image}
              alt={milkPages[currentPage].description}
              className="card-image"
            />
          </div>
        </div>
    
        {/* Buttons aligned horizontally at the bottom */}
        <div className="card-buttons">
          <button className="switch-button left" onClick={handleSwitchLeft}>⮜</button>
          <button className="switch-button right" onClick={handleSwitchRight}>⮞</button>
        </div>
      </div>
    );
};

export default MilkProductCard;
