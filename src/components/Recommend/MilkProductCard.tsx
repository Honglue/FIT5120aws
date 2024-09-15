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
    },
    {
      description: 'slices hard cheese',
      quantity: '2',
      kJ: '600',
    },
    {
      description: 'cup yoghurt',
      quantity: '0.5',
      kJ: '600',
    },
    {
      description: 'cup soy beverage',
      quantity: '1',
      kJ: '600',
    },
  ];

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : milkPages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < milkPages.length - 1 ? prev + 1 : 0));
  };

  // If data is not available yet, show loading or empty state
  if (!data || !data.milk) {
    return <p>Loading milk data...</p>;
  }

  // Calculate total kJ (milk serves * 600 kJ per serve)
  const totalKJ = parseFloat(data.milk) * 600;

  // Calculate the text for the current page
  const currentQuantity = parseFloat(milkPages[currentPage].quantity) * parseFloat(data.milk);
  const pageText = `${currentQuantity} ${milkPages[currentPage].description}`;

  return (
    <div className="card">
      <div className="title-bar">
        <h3>Milk Products</h3>
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

export default MilkProductCard;
