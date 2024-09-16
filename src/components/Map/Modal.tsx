import React, { useState } from "react";
import "./Modal.css";

const exampleImages: { [key: string]: { images: string[]; labels: string[] } } =
  {
    1: {
      images: ["fruits1.png", "fruits2.png", "fruits3.png"],
      labels: ["Apple", "Orange", "Banana"],
    },
    2: {
      images: ["vegetables1.png", "vegetables2.png", "vegetables3.png"],
      labels: ["Broccoli", "Spinach", "Bell Pepper"],
    },
    3: {
      images: ["legumes1.png", "legumes2.png", "legumes3.png"],
      labels: ["Lentils", "Chickpeas", "Black Beans"],
    },
    4: {
      images: ["nuts1.png", "nuts2.png", "nuts3.png"],
      labels: ["Almonds", "Walnuts", "Cashews"],
    },
    5: {
      images: ["refinedcarbs1.png", "refinedcarbs2.png", "refinedcarbs3.png"],
      labels: ["White Bread", "Pastries", "Cookies"],
    },
    6: {
      images: ["wholegrains1.png", "wholegrains2.png", "wholegrains3.png"],
      labels: ["Brown Rice", "Oats", "Quinoa"],
    },
    7: {
      images: [
        "processedmeats1.png",
        "processedmeats2.png",
        "processedmeats3.png",
      ],
      labels: ["Bacon", "Sausage", "Hot Dogs"],
    },
    8: {
      images: ["redmeats1.png", "redmeats2.png", "redmeats3.png"],
      labels: ["Beef", "Lamb", "Pork"],
    },
    9: {
      images: ["saturatedfat1.png", "saturatedfat2.png", "saturatedfat3.png"],
      labels: ["Butter", "Cheese", "Cream"],
    },
    10: {
      images: [
        "monounsaturated1.png",
        "monounsaturated2.png",
        "monounsaturated3.png",
      ],
      labels: ["Olive Oil", "Avocados", "Nuts"],
    },
    11: {
      images: ["addedsugars1.png", "addedsugars2.png", "addedsugars3.png"],
      labels: ["Soda", "Candy", "Ice Cream"],
    },
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

  const { images, labels } = exampleImages[nutritionId];
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
      <div
        className="modal-content"
        style={{
          width: "500px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Header with Title and Close Button */}
        <div className="modal-header">
          <h4>{variableMap[nutritionId]}</h4>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Navigation arrows */}
        <div
          className="navigation-arrows"
          style={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          <button className="arrow-left" onClick={handlePrevClick}>
            &#8592;
          </button>

          {/* Image Display */}
          <div
            className="image-container"
            style={{ width: "80%", margin: "0 auto" }}
          >
            <img
              src={`../../../public/images/${images[currentIndex]}`}
              alt={variableMap[nutritionId]}
              style={{
                width: "250px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            {/* Displaying the label below the image */}
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              {labels[currentIndex]}
            </p>
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
