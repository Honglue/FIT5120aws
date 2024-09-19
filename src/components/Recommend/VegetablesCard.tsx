import React, { useState } from "react";
import "./Recommend.css";

// Define the prop types for the card component
interface VegetablesCardProps {
  data: {
    vegetable?: string;
    fruit?: string;
    grain?: string;
    "lean meat"?: string;
    milk?: string;
  } | null; // Allow null since the data could be unavailable initially
}

const VegetablesCard: React.FC<VegetablesCardProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Hardcoded pages for different vegetable types (use as an example for the page content)
  const vegetablePages = [
    {
      description: "cup of cooked broccoli, spinach, carrots or pumpkin",
      quantity: "0.5",
      kJ: "300",
      image: "/images/recommend/veg1.jpg",
    },
    {
      description: "cup cooked beans, peas or lentils",
      quantity: "0.5",
      kJ: "300",
      image: "/images/recommend/veg2.jpg",
    },
    {
      description: "cup of green leafy or raw salad vegetables",
      quantity: "1",
      kJ: "300",
      image: "/images/recommend/veg3.jpg",
    },
    {
      description: "cup of sweetcorn",
      quantity: "0.5",
      kJ: "300",
      image: "/images/recommend/veg4.jpg",
    },
    {
      description: "medium potato, sweet potato, taro or cassava",
      quantity: "0.5",
      kJ: "300",
      image: "/images/recommend/veg5.jpg",
    },
    {
      description: "medium tomato",
      quantity: "1",
      kJ: "300",
      image: "/images/recommend/veg6.jpg",
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
  const currentQuantity =
    vegetableServes * parseFloat(vegetablePages[currentPage].quantity);
  const pageText = vegetableServes
    ? `${currentQuantity} ${vegetablePages[currentPage].description}`
    : "input your age, gender, height and weight";

  return (
    <div className="card">
      {/* Title bar */}
      <div className="title-bar">
        <h4>Vegetables</h4>
        <h5 style={{ color: "#6366f1" }}>{totalKJ || "0"}kJ</h5>
      </div>

      {/* Content area: Description and Image */}
      <div className="content" style={{ textAlign: "left" }}>
        {/* Description text */}
        <p className="lead" style={{ textAlign: "left" }}>
          {pageText}
        </p>
        </div>

        {/* Image container */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <img
            className="card-image"
            src={vegetablePages[currentPage].image}
            alt={vegetablePages[currentPage].description}
            style={{
              // width: "60%",
              maxHeight: "150px",
              maxWidth: "500px",
              borderRadius: "10px",
            }}
          />
        </div>

      {/* Button area */}
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

export default VegetablesCard;
