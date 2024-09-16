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

  // Hardcoded pages for different grain types (each with a unique image)
  const grainPages = [
    {
      description: 'slice of bread',
      quantity: '1',
      kJ: '500',
      image: '/images/recommend/grain1.jpg',
    },
    {
      description: 'medium roll bread',
      quantity: '0.5',
      kJ: '500',
      image: '/images/recommend/grain2.jpg',
    },
    {
      description: 'cup cooked porridge',
      quantity: '0.5',
      kJ: '500',
      image: '/images/recommend/grain3.jpg',
    },
    {
      description: 'cup cooked rice, pasta, noodles, barley, buckwheat, semolina, polenta, bulgur or quinoa',
      quantity: '0.5',
      kJ: '500',
      image: '/images/recommend/grain4.jpg',
    },
    {
      description: 'cup muesli',
      quantity: '0.25',
      kJ: '500',
      image: '/images/recommend/grain5.jpg',
    },
    {
      description: 'crispbreads',
      quantity: '3',
      kJ: '500',
      image: '/images/recommend/grain6.jpg',
    },
  ];

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : grainPages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < grainPages.length - 1 ? prev + 1 : 0));
  };

  // Render placeholder content when data is not available
  const grainServes = data?.grain ? parseFloat(data.grain) : 0;

  // Calculate total kJ (grain serves * 500 kJ per serve) or default to 0
  const totalKJ = grainServes * 500;

  // Calculate the text for the current page, or use placeholder
  const currentQuantity = grainServes
    ? parseFloat(grainPages[currentPage].quantity) * grainServes
    : '0';
  const pageText = grainServes
    ? `${currentQuantity} ${grainPages[currentPage].description}`
    : 'input your age, gender, height and weight';

  return (
      <div className="card">
        {/* Title Bar */}
        <div className="title-bar">
          <h3>Grains</h3>
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
              src={grainPages[currentPage].image}
              alt={grainPages[currentPage].description}
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

export default GrainsCard;
