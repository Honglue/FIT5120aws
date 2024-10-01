import React, { useState } from "react";
import "./Recommendations.css";

// Define the prop types for the card component
interface RecipeCardProps {
  data: {
    name: string;
    image: string;
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
    cuisineType: string[];
    mealType: string[];
    totalTime: number;
    yield: number;
  };
}

const Card: React.FC<RecipeCardProps> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="recommendations-card">
      <img
        className="card-image"
        src={data.image}
        alt={data.name}
        style={{
          maxHeight: "150px",
          maxWidth: "500px",
          borderRadius: "10px",
        }}
      />

      {/* Title Bar */}
      <div className="title-bar" style={{ textAlign: "left" }}>
        <h5
          style={{ fontSize: "22px", paddingTop: "10px", fontWeight: "bold" }}
        >
          {data.name}
        </h5>
      </div>

      {/* Content */}
      <div
        className="content"
        style={{
          textAlign: "left",
          // maxHeight: "200px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* <p>Ingredients: {data.ingredients.join(", ")}</p> */}

        <p>Calories: {data.nutrition.calories?.toFixed(2)} kcal</p>
        <p>Proteins: {data.nutrition.proteins?.toFixed(2)} g</p>
        <p>Carbs: {data.nutrition.carbs?.toFixed(2)} g</p>
        <p>Fats: {data.nutrition.fats?.toFixed(2)} g</p>
        {/* <p>Fiber: {data.nutrition.fiber?.toFixed(2)} g</p>
        <p>Sugar: {data.nutrition.sugar?.toFixed(2)} g</p>
        <p>Vitamin A: {data.nutrition.vitaminA?.toFixed(2)} g</p>
        <p>Vitamin C: {data.nutrition.vitaminC?.toFixed(2)} g</p>
        <p>Calcium: {data.nutrition.calcium?.toFixed(2)} g</p>
        <p>Sodium: {data.nutrition.sodium?.toFixed(2)} mg</p>  */}

        {/* <h4>Health Labels</h4>
        <p>{data.healthLabels.join(", ")}</p> */}

        {/* <h4>Additional Info</h4>
        <p>Cuisine Type: {data.cuisineType.join(", ")}</p>
        <p>Meal Type: {data.mealType.join(", ")}</p>
        <p>Total Time: {data.totalTime} minutes</p>
        <p>Yield: {data.yield} servings</p> */}

        {/* Read More Button */}
        <p onClick={openModal} className="read-more">
          Read More
        </p>
      </div>

      {/* Modal for displaying full content */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ textAlign: "left" }}>{data.name}</h2>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <img className="card-image" src={data.image} alt={data.name} />
              <hr />
              <h3>Ingredients</h3>
              <p>{data.ingredients.join(", ")}</p>

              <hr />
              <h4>Nutritional Information</h4>
              <p>
                Calories: <strong>{data.nutrition.calories?.toFixed(2)}</strong>{" "}
                kcal
              </p>
              <p>
                Proteins: <strong>{data.nutrition.proteins?.toFixed(2)}</strong>{" "}
                g
              </p>
              <p>
                Carbs: <strong>{data.nutrition.carbs?.toFixed(2)}</strong> g
              </p>
              <p>
                Fats: <strong>{data.nutrition.fats?.toFixed(2)}</strong> g
              </p>
              <p>
                Fiber: <strong>{data.nutrition.fiber?.toFixed(2)}</strong> g
              </p>
              <p>
                Sugar: <strong>{data.nutrition.sugar?.toFixed(2)}</strong> g
              </p>
              <p>
                Vitamin A:{" "}
                <strong>{data.nutrition.vitaminA?.toFixed(2)}</strong> g
              </p>
              <p>
                Vitamin C:{" "}
                <strong>{data.nutrition.vitaminC?.toFixed(2)}</strong> g
              </p>
              <p>
                Calcium: <strong>{data.nutrition.calcium?.toFixed(2)}</strong> g
              </p>
              <p>
                Sodium: <strong>{data.nutrition.sodium?.toFixed(2)}</strong> mg
              </p>

              <hr />
              <h4>Health Labels</h4>
              <p>{data.healthLabels.join(", ")}</p>

              <hr />
              <h4>Additional Info</h4>
              <p>Cuisine Type: {data.cuisineType.join(", ")}</p>
              <p>Meal Type: {data.mealType.join(", ")}</p>
              <p>Total Time: {data.totalTime} minutes</p>
              <p>Yield: {data.yield} servings</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
