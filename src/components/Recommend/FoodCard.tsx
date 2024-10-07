import React, { useState } from "react";
import "./FoodCard.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface FoodCardProps {
  title: string;
  data: number | null;
  pages: {
    description: string;
    quantity: string;
    kJ: string;
    image: string;
  }[];
}

const FoodCard: React.FC<FoodCardProps> = ({ title, data, pages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleSwitchLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : pages.length - 1));
  };

  const handleSwitchRight = () => {
    setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : 0));
  };

  const serves = data ? parseFloat(data.toString()) : 0;
  const totalKJ = serves * 600;
  const currentQuantity = serves * parseFloat(pages[currentPage].quantity);
  const pageText = serves
    ? `${currentQuantity} ${pages[currentPage].description}`
    : "Input your age, gender, height, and weight";

  return (
    <div className="food-card">
      <div className="food-card-image-container">
        <img
          className="food-card-image"
          src={pages[currentPage].image}
          alt={pages[currentPage].description}
        />

        <div className="food-card-row">
          <div className="food-card-buttons">
            <div className="switch-button left" onClick={handleSwitchLeft}>
              <FiArrowLeft />
            </div>
            <div className="switch-button right" onClick={handleSwitchRight}>
              <FiArrowRight />
            </div>
          </div>
          <div />
        </div>
      </div>

      <div className="food-card-content">
        <h4 style={{ fontWeight: "500" }}>{title}</h4>
        <p style={{ color: "#6366f1" }}>{totalKJ || "0"} kJ</p>

        <div className="content">
          <p>{pageText}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
