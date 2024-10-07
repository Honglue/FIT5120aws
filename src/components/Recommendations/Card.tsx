import React, { useState } from "react";
import "./Card.css";

interface RecipeCardProps {
  data: {
    name: string;
    url: string;
    image: string;
    source: string;
    ingredients: string[];
    nutrition: {
      calories?: number;
      proteins?: number;
      carbs?: number;
      fats?: number;
      fiber?: number;
      sugar?: number;
      vitaminA?: number;
      vitaminC?: number;
      calcium?: number;
      sodium?: number;
    };
    healthLabels: string[];
    dietLabels: string[];
    cuisineType: string[];
    mealType: string[];
    totalTime: number;
    yield: number;
  };
  countryDietLabels: string[];
}

const dietLabelTooltips: { [key: string]: string } = {
  Balanced: "Healthy diet",
  "High-Fiber": "Aid digestion",
  "High-Protein": "Support muscle growth",
  "Low-Carb": "Reduce sugar levels",
  "Low-Fat": "For heart health",
  "Low-Sodium": "Low in salt",
};

const dietLabelColors: { [key: string]: { background: string; text: string } } =
  {
    Balanced: { background: "#e0ffe0", text: "#4caf50" }, // Light Green with darker green text
    "High-Fiber": { background: "#fff4e0", text: "#ff9800" }, // Light Orange with darker orange text
    "High-Protein": { background: "#e0f7f7", text: "#00796b" }, // Light Teal with darker teal text
    "Low-Carb": { background: "#e0f7ff", text: "#03a9f4" }, // Light Blue with darker blue text
    "Low-Fat": { background: "#fff9e0", text: "#ffc107" }, // Light Yellow with darker yellow text
    "Low-Sodium": { background: "#f0e0ff", text: "#9c27b0" }, // Light Purple with darker purple text
  };

const Card: React.FC<RecipeCardProps> = ({ data, countryDietLabels }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const matchingDietLabels =
    Array.isArray(data.dietLabels) && Array.isArray(countryDietLabels)
      ? data.dietLabels.filter((label) => countryDietLabels.includes(label))
      : [];

  const dietaryFocusLabel =
    matchingDietLabels.length > 0
      ? matchingDietLabels.join(", ")
      : data.dietLabels.length > 0
      ? data.dietLabels[0]
      : null;

  return (
    <div className="recommendations-card" onClick={openModal}>
      <div>
        <img className="card-image" src={data.image} alt={data.name} />
      </div>

      <div className="card-info">
        {/* Title Bar */}
        <div className="title-bar">
          <h5 className="title-text">{data.name}</h5>
        </div>

        {/* Content */}
        <div
          className="card-content"
          style={{
            textAlign: "left",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <p style={{ color: "#363636" }}>
            {data.nutrition.calories?.toFixed(2)} kcal
          </p>

          {dietaryFocusLabel && (
            <p>
              <span
                className="diet-label"
                title={
                  dietLabelTooltips[dietaryFocusLabel.split(", ")[0]] || ""
                }
                style={{
                  backgroundColor:
                    dietLabelColors[dietaryFocusLabel.split(", ")[0]]
                      ?.background || "#ddd",
                  color:
                    dietLabelColors[dietaryFocusLabel.split(", ")[0]]?.text ||
                    "#555",
                }}
              >
                {dietaryFocusLabel.split(", ")[0] || "Generic"}
              </span>
            </p>
          )}

          {/* Fallback label when no matches are found */}
          {!dietaryFocusLabel && (
            <p>
              <span
                className="diet-label"
                title="General dietary recommendation"
                style={{
                  backgroundColor: "#e0e0e0",
                  color: "#555555",
                }}
              >
                Generic
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Modal for displaying full content */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              {/* <h2 style={{ textAlign: "left" }}>{data.name}</h2> */}
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="image-info-container">
                {/* Image on the left */}
                <img className="modal-image" src={data.image} alt={data.name} />

                {/* Title and Additional Info on the right */}
                <div className="info-section">
                  <h4>{data.name}</h4>

                  {/* Map diet labels to the colors */}
                  <div className="diet-label-container">
                    {data.dietLabels.map((label, index) => (
                      <span
                        key={index}
                        className="diet-label"
                        title={dietLabelTooltips[label] || ""}
                        style={{
                          backgroundColor:
                            dietLabelColors[label]?.background || "#ddd",
                          color: dietLabelColors[label]?.text || "#555",
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  <div>
                    <p>
                      Cuisine Type:{" "}
                      {data.cuisineType
                        .map((cuisine) =>
                          cuisine
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")
                        )
                        .join(", ")}
                    </p>

                    <p>Yield: {data.yield} servings</p>
                    <p>
                      Visit Source:{" "}
                      <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#6366f1",
                          textDecoration: "underline",
                        }}
                      >
                        {data.source}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <hr className="section-divider" />

              <div className="ingredients-section">
                <h4>Ingredients</h4>
                <p>{data.ingredients.join(", ")}</p>
              </div>

              <hr className="section-divider" />

              <div className="nutrition-section">
                <h4>Nutritional Information</h4>
                <div className="nutrition-grid">
                  <div className="nutrition-grid-item">
                    <p className="nutrition-header">Calories</p>
                    <p className="nutrition-value">
                      {data.nutrition.calories?.toFixed(2)} kcal
                    </p>
                  </div>
                  <div className="nutrition-grid-item">
                    <p className="nutrition-header">Protein</p>
                    <p className="nutrition-value">
                      {data.nutrition.proteins?.toFixed(2)} g
                    </p>
                  </div>
                  <div className="nutrition-grid-item">
                    <p className="nutrition-header">Carbs</p>
                    <p className="nutrition-value">
                      {data.nutrition.carbs?.toFixed(2)} g
                    </p>
                  </div>
                  <div className="nutrition-grid-item">
                    <p className="nutrition-header">Fats</p>
                    <p className="nutrition-value">
                      {data.nutrition.fats?.toFixed(2)} g
                    </p>
                  </div>
                  <div className="nutrition-grid-item">
                    <p className="nutrition-header">Fiber</p>
                    <p className="nutrition-value">
                      {data.nutrition.fiber?.toFixed(2)} g
                    </p>
                  </div>
                  <div className="nutrition-grid-item">
                    <p className="nutrition-header">Sugar</p>
                    <p className="nutrition-value">
                      {data.nutrition.sugar?.toFixed(2)} g
                    </p>
                  </div>
                  <div className="nutrition-grid-item">
                    <p className="nutrition-header">Vitamin A</p>
                    <p className="nutrition-value">
                      {data.nutrition.vitaminA?.toFixed(2)} g
                    </p>
                  </div>
                  <div className="nutrition-grid-item">
                    <p className="nutrition-header">Vitamin C</p>
                    <p className="nutrition-value">
                      {data.nutrition.vitaminC?.toFixed(2)} g
                    </p>
                  </div>
                  <div className="nutrition-grid-item">
                    <p className="nutrition-header">Calcium</p>
                    <p className="nutrition-value">
                      {data.nutrition.calcium?.toFixed(2)} g
                    </p>
                  </div>
                  <div className="nutrition-grid-item">
                    <p className="nutrition-header">Sodium</p>
                    <p className="nutrition-value">
                      {data.nutrition.sodium?.toFixed(2)} mg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
