import React, { useState } from "react";
import "./Modal.css";

// Example image links for each nutrition variable
const exampleImages: { [key: string]: string[] } = {
  1: ["fruits1.jpg", "fruits2.jpg", "fruits3.jpg"],
  2: ["vegetables1.jpg", "vegetables2.jpg", "vegetables3.jpg"],
  3: ["legumes1.jpg", "legumes2.jpg", "legumes3.jpg"],
  4: ["nuts1.jpg", "nuts2.jpg", "nuts3.jpg"],
  5: ["refinedcarbs1.jpg", "refinedcarbs2.jpg", "refinedcarbs3.jpg"],
  6: ["wholegrains1.jpg", "wholegrains2.jpg", "wholegrains3.jpg"],
  7: ["processedmeats1.jpg", "processedmeats2.jpg", "processedmeats3.jpg"],
  8: ["redmeats1.jpg", "redmeats2.jpg", "redmeats3.jpg"],
  9: ["saturatedfat1.jpg", "saturatedfat2.jpg", "saturatedfat3.jpg"],
  10: ["monounsaturated1.jpg", "monounsaturated2.jpg", "monounsaturated3.jpg"],
  11: ["addedsugars1.jpg", "addedsugars2.jpg", "addedsugars3.jpg"],
};

const variableMap: { [key: string]: string } = {
  1: "Fruits",
  2: "Non-starchy Vegetables",
  3: "Beans & Legumes",
  4: "Nuts & Seeds",
  5: "Refined Carbs",
  6: "Whole Grains",
  7: "Total Processed Meats",
  8: "Unprocessed Red Meats",
  9: "Saturated Fat",
  10: "Monounsaturated Fatty Acids",
  11: "Added Sugars",
};

interface ModalProps {
  show: boolean;
  onClose: () => void;
  nutritionId: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, nutritionId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!show || !nutritionId) {
    return null;
  }

  const images = exampleImages[nutritionId];
  const totalImages = images.length;

  // Handle previous image navigation
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  // Handle next image navigation
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header with Title and Close Button */}
        <div className="modal-header">
          <h4>{variableMap[nutritionId]}</h4>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Navigation arrows */}
        <div className="navigation-arrows">
          <button className="arrow-left" onClick={handlePrevClick}>
            &#8592;
          </button>

          {/* Image Display */}
          <div className="image-container">
            <img
              src={images[currentIndex]} // Display the current image
              alt={variableMap[nutritionId]}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>

          <button className="arrow-right" onClick={handleNextClick}>
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
