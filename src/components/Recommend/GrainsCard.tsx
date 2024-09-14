import React, { useState } from 'react';
import './Recommend.css';

// Define the prop types for the card component
interface GrainsCardProps {
  data: { 
    vegetable?: string; 
    fruit?: string; 
    grain?: string; 
    'lean meat'?: string; 
    milk?: string 
  } | null; // Allow null since the data could be unavailable initially
}

const GrainsCard: React.FC<GrainsCardProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Hardcoded pages for different grain types (use as an example for the page content)
  const grainPages = [
    {
      description: 'slice of bread',
      quantity: '1',
      kJ: '500',
    },
    {
      description: 'medium roll bread',
      quantity: '0.5',
      kJ: '500',
    },
    {
      description: 'cup cooked porridge',
      quantity: '0.5',
      kJ: '500',
    },
    {
      description: 'cup cooked rice, pasta, noodles, barley, buckwheat, semolina, polenta, bulgur or quinoa',
      quantity: '0.5',
      kJ: '500',
    },
    {
      description: 'cup muesli',
      quantity: '0.25',
      kJ: '500',
    },
    {
      description: 'crispbreads',
      quantity: '3',
      kJ: '500',
    },
  ];

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : grainPages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < grainPages.length - 1 ? prev + 1 : 0));
  };

  // If data is not available yet, show loading or empty state
  if (!data || !data.grain) {
    return <p>Loading grain data...</p>;
  }

  // Calculate total kJ (grain serves * 500 kJ per serve)
  const totalKJ = parseFloat(data.grain) * 500;

  // Calculate the text for the current page
  const currentQuantity = parseFloat(grainPages[currentPage].quantity) * parseFloat(data.grain);
  const pageText = `${currentQuantity} ${grainPages[currentPage].description}`;

  return (
    <div className="card">
      <div className="title-bar">
        <h3>Grains</h3>
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

export default GrainsCard;
