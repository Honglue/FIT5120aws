import React, { useState } from 'react';
import './Recommend.css';

// Define the prop types for the card component
interface LeanMeatsCardProps {
  data: { 
    vegetable?: string; 
    fruit?: string; 
    grain?: string; 
    'lean meat'?: string; 
    milk?: string 
  } | null; // Allow null since the data could be unavailable initially
}

const LeanMeatsCard: React.FC<LeanMeatsCardProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Hardcoded pages for different lean meat types (use as an example for the page content)
  const leanMeatPages = [
    {
      description: 'g cooked lean meat of beef, veal, lamb, pork, kangaroo or goat',
      quantity: '65',
      kJ: '600',
      image: '/images/recommend/meat1.jpg',
    },
    {
      description: 'g cooked poultry of skinless chicken or turkey',
      quantity: '80',
      kJ: '600',
      image: '/images/recommend/meat2.jpg',
    },
    {
      description: 'g cooked fish fillet or small can of fish',
      quantity: '100',
      kJ: '600',
      image: '/images/recommend/meat3.jpg',
    },
    {
      description: 'large eggs',
      quantity: '2',
      kJ: '600',
      image: '/images/recommend/meat4.jpg',
    },
  ];

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : leanMeatPages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < leanMeatPages.length - 1 ? prev + 1 : 0));
  };

  // Render placeholder content when data is not available
  const leanMeatServes = data?.['lean meat'] ? parseFloat(data['lean meat']) : 0;

  // Calculate total kJ (lean meat serves * 600 kJ per serve) or default to 0
  const totalKJ = leanMeatServes * 600;

  // Calculate the text for the current page, or use placeholder
  const currentQuantity = leanMeatServes * parseFloat(leanMeatPages[currentPage].quantity);
  const pageText = leanMeatServes
    ? `${currentQuantity} ${leanMeatPages[currentPage].description}`
    : 'input your age, gender, height and weight';

    return (
      <div className="card">
        {/* Title Bar */}
        <div className="title-bar">
          <h3>Lean Meat</h3>
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
              src={leanMeatPages[currentPage].image}
              alt={leanMeatPages[currentPage].description}
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

export default LeanMeatsCard;
