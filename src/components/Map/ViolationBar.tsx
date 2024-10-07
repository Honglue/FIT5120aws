import React from "react";

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

interface ViolationBarProps {
  nutritionId: string;
  low: number;
  medium: number;
  high: number;
  isGoodNutrition: boolean;
}

export const ViolationBar: React.FC<ViolationBarProps> = ({
  nutritionId,
  low,
  medium,
  high,
  isGoodNutrition,
}) => {
  const goodNutritionColors = ["#A7F3D0", "#6EE7B7", "#34D399"];
  const badNutritionColors = ["#FCA5A5", "#F87171", "#EF4444"];

  const [lowColor, mediumColor, highColor] = isGoodNutrition
    ? goodNutritionColors
    : badNutritionColors;

  return (
    <div className="my-1 p-3" style={{ textAlign: "left" }}>
      <div className="mb-3">
        <h5>{variableMap[nutritionId]}</h5>
      </div>

      {/* Labels for Low, Normal, High */}
      <div className="d-flex justify-content-between mb-1">
        <div>Low</div>
        <div>Normal</div>
        <div>High</div>
      </div>

      {/* Custom Progress Bar with Three Sections */}
      <div className="d-flex" style={{ height: "20px", width: "100%" }}>
        {/* Low Section */}
        <div
          style={{
            width: "33.33%",
            backgroundColor: "#e0e0e0",
            marginRight: "4px",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              width: `${(low / 100) * 100}%`,
              height: "100%",
              backgroundColor: lowColor,
              borderRadius: "4px",
              transition: "width 0.5s ease",
            }}
          ></div>
        </div>

        {/* Medium Section */}
        <div
          style={{
            width: "33.33%",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            marginRight: "4px",
          }}
        >
          <div
            style={{
              width: `${(medium / 100) * 100}%`,
              height: "100%",
              backgroundColor: mediumColor,
              borderRadius: "4px",
              transition: "width 0.5s ease",
            }}
          ></div>
        </div>

        {/* High Section */}
        <div
          style={{
            width: "33.33%",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              width: `${(high / 100 >= 0.33 ? 1.0 : high / 100) * 100}%`,
              height: "100%",
              backgroundColor: highColor,
              transition: "width 0.5s ease",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
