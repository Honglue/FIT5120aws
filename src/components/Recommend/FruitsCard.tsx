import React, { useState } from "react";
import "./Recommend.css";

// Define the prop types for the card component
interface FruitsCardProps {
  data: {
    vegetable?: string;
    fruit?: string;
    grain?: string;
    "lean meat"?: string;
    milk?: string;
  } | null; // Allow null since the data could be unavailable initially
}

const FruitsCard: React.FC<FruitsCardProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Hardcoded pages for different fruit types (use as an example for the page content)
  const fruitPages = [
    {
      description: "medium apple, banana, orange or pear",
      quantity: "1",
      kJ: "350",
      image: "/images/recommend/fruit1.jpg",
    },
    {
      description: "small apricots, kiwi fruits or plums",
      quantity: "2",
      kJ: "350",
      image: "/images/recommend/fruit2.jpg",
    },
    {
      description: "cup canned fruit with no added sugar",
      quantity: "1",
      kJ: "350",
      image: "/images/recommend/fruit3.jpg",
    },
    {
      description: "cup 100% fruit juice with no added sugar",
      quantity: "0.5",
      kJ: "350",
      image: "/images/recommend/fruit4.jpg",
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
  const currentQuantity =
    fruitServes * parseFloat(fruitPages[currentPage].quantity);
  const pageText = fruitServes
    ? `${currentQuantity} ${fruitPages[currentPage].description}`
    : "input your age, gender, height and weight";

  return (
    <div className="card">
      {/* Title Bar */}
      <div className="title-bar">
        <h4>Fruits</h4>
        <h5 style={{ color: "#6366f1" }}>{totalKJ || "0"}kJ</h5>
      </div>

      {/* Content */}
      <div className="content" style={{ textAlign: "left" }}>
        {/* Description text */}
        <p className="lead" style={{ textAlign: "left" }}>
          {pageText}
        </p>

        {/* Image container */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <img
            className="card-image"
            src={fruitPages[currentPage].image}
            alt={fruitPages[currentPage].description}
            style={{
              width: "60%",
              maxHeight: "150px",
              maxWidth: "500px",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>

      {/* Button area at the bottom */}
      <div className="card-buttons">
        <button className="switch-button left" onClick={handleSwitchLeft}>
          &#8592;
        </button>
        <button className="switch-button right" onClick={handleSwitchRight}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default FruitsCard;
