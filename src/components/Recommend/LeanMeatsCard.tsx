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
    },
    {
      description: 'g cooked poultry of skinless chicken or turkey',
      quantity: '80',
      kJ: '600',
    },
    {
      description: 'g cooked fish fillet or small can of fish',
      quantity: '100',
      kJ: '600',
    },
    {
      description: 'large eggs',
      quantity: '2',
      kJ: '600',
    },
  ];

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : leanMeatPages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < leanMeatPages.length - 1 ? prev + 1 : 0));
  };

  // If data is not available yet, show loading or empty state
  if (!data || !data['lean meat']) {
    return <p>Loading lean meat data...</p>;
  }

  // Calculate total kJ (lean meat serves * 600 kJ per serve)
  const totalKJ = parseFloat(data['lean meat']) * 600;

  // Calculate the text for the current page
  const currentQuantity = parseFloat(leanMeatPages[currentPage].quantity) * parseFloat(data['lean meat']);
  const pageText = `${currentQuantity} ${leanMeatPages[currentPage].description}`;

  return (
    <div className="card">
      <div className="title-bar">
        <h3>Lean Meat</h3>
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

export default LeanMeatsCard;
