import React, { useState } from "react";
import "./Modal.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

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
          <h4 style={{ fontWeight: "normal" }}>{variableMap[nutritionId]}</h4>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Navigation arrows */}
        <div
          className="navigation-arrows"
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Image Display */}
          <div
            className="image-container"
            style={{ width: "80%", margin: "0 auto" }}
          >
            <img
              src={`/images/${images[currentIndex]}`}
              alt={variableMap[nutritionId]}
              style={{
                height: "200px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />

            <div
              style={{
                marginTop: "20px",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  textAlign: "left",
                  marginTop: "10px",
                  fontSize: "20px",
                }}
              >
                {labels[currentIndex]}
              </p>

              <div
                style={{
                  width: "100px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <button className="arrow-left" onClick={handlePrevClick}>
                  <FiArrowLeft size={20} />
                </button>

                <button className="arrow-right" onClick={handleNextClick}>
                  <FiArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
