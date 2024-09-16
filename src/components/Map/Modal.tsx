import React, { useState } from "react";
import "./Modal.css";

const exampleImages: { [key: string]: { images: string[]; labels: string[] } } =
  {
    1: {
      images: ["fruits1.jpg", "fruits2.jpg", "fruits3.jpg"],
      labels: ["Apple", "Orange", "Banana"],
    },
    2: {
      images: ["vegetables1.jpg", "vegetables2.jpg", "vegetables3.jpg"],
      labels: ["Broccoli", "Spinach", "Bell Pepper"],
    },
    3: {
      images: ["legumes1.jpg", "legumes2.jpg", "legumes3.jpg"],
      labels: ["Lentils", "Chickpeas", "Black Beans"],
    },
    4: {
      images: ["nuts1.jpg", "nuts2.jpg", "nuts3.jpg"],
      labels: ["Almonds", "Walnuts", "Cashews"],
    },
    5: {
      images: ["refinedcarbs1.jpg", "refinedcarbs2.jpg", "refinedcarbs3.jpg"],
      labels: ["White Bread", "Pastries", "Cookies"],
    },
    6: {
      images: ["wholegrains1.jpg", "wholegrains2.jpg", "wholegrains3.jpg"],
      labels: ["Brown Rice", "Oats", "Quinoa"],
    },
    7: {
      images: [
        "processedmeats1.jpg",
        "processedmeats2.jpg",
        "processedmeats3.jpg",
      ],
      labels: ["Bacon", "Sausage", "Hot Dogs"],
    },
    8: {
      images: ["redmeats1.jpg", "redmeats2.jpg", "redmeats3.jpg"],
      labels: ["Beef", "Lamb", "Pork"],
    },
    9: {
      images: ["saturatedfat1.jpg", "saturatedfat2.jpg", "saturatedfat3.jpg"],
      labels: ["Butter", "Cheese", "Cream"],
    },
    10: {
      images: [
        "monounsaturated1.jpg",
        "monounsaturated2.jpg",
        "monounsaturated3.jpg",
      ],
      labels: ["Olive Oil", "Avocados", "Nuts"],
    },
    11: {
      images: ["addedsugars1.jpg", "addedsugars2.jpg", "addedsugars3.jpg"],
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
