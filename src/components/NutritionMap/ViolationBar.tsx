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

// Descriptions based on the nutrition type and level
const descriptionMap: { [key: string]: { [key: string]: string } } = {
  1: {
    low: "Low fruit intake can lead to deficiencies in vitamins, minerals, and fiber.",
    medium: "Normal fruit intake aligns with dietary recommendations.",
    high: "High fruit intake is beneficial but be mindful of sugar intake.",
  },
  2: {
    low: "Low intake of non-starchy vegetables may lead to insufficient fiber and micronutrients.",
    medium: "Normal intake is sufficient for maintaining good health.",
    high: "High intake is beneficial for health, providing a range of nutrients.",
  },
  3: {
    low: "Low intake of beans and legumes may cause a lack of protein and fiber.",
    medium: "Normal intake provides plant-based protein and fiber.",
    high: "High intake is good for heart health and weight management.",
  },
  4: {
    low: "Low intake of nuts and seeds misses out on healthy fats and minerals.",
    medium: "Normal intake contributes to cardiovascular health.",
    high: "High intake can be good for heart health but balance is key.",
  },
  5: {
    low: "Low intake of refined carbs is beneficial for reducing obesity and diabetes risks.",
    medium: "Moderate intake may be acceptable, but lower is better.",
    high: "High intake increases the risk of obesity, diabetes, and heart disease.",
  },
  6: {
    low: "Low intake of whole grains can increase the risk of chronic diseases.",
    medium: "Normal intake supports digestive health and reduces disease risk.",
    high: "High intake provides additional fiber and is good for cardiovascular health.",
  },
  7: {
    low: "Low intake of processed meats reduces cancer and heart disease risks.",
    medium: "Moderate intake might be acceptable but reducing is better.",
    high: "High intake is linked to increased cancer and heart disease risks.",
  },
  8: {
    low: "Low intake of unprocessed red meats may reduce certain health risks.",
    medium: "Moderate intake is generally acceptable but moderation is key.",
    high: "High intake can increase risks of cardiovascular diseases and cancers.",
  },
  9: {
    low: "Low intake of saturated fat supports heart health by lowering LDL cholesterol.",
    medium: "Moderate intake may not be harmful, but less is better.",
    high: "High intake is linked to increased LDL cholesterol and heart disease risk.",
  },
  10: {
    low: "Low intake of monounsaturated fats may negatively impact heart health.",
    medium: "Normal intake supports cardiovascular health.",
    high: "High intake is beneficial for heart health, though balance is important.",
  },
  11: {
    low: "Low intake of added sugars reduces the risk of obesity and diabetes.",
    medium:
      "Moderate intake might be acceptable, but reducing sugar is healthier.",
    high: "High intake is associated with obesity, diabetes, and heart problems.",
  },
};

interface ViolationBarProps {
  nutritionId: string;
  low: number;
  medium: number;
  high: number;
}

const ViolationBar: React.FC<ViolationBarProps> = ({
  nutritionId,
  low,
  medium,
  high,
}) => {
  const getDescription = () => {
    if (low > 0) return descriptionMap[nutritionId].low;
    if (medium > 0) return descriptionMap[nutritionId].medium;
    if (high > 0) return descriptionMap[nutritionId].high;
    return "";
  };

  return (
    <div
      className="violation-bar-container my-2 p-3"
      style={{ textAlign: "left" }}
    >
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
              backgroundColor: "#A5B4FC",
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
              backgroundColor: "#818CF8",
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
              backgroundColor: "#6366F1",
              transition: "width 0.5s ease",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      </div>

      {/* Description Section */}
      <p className="mt-4">
        <strong>Level: </strong>
        {low > 0 ? "Low" : medium > 0 ? "Medium" : "High"}
      </p>

      <p className="">{getDescription()}</p>
    </div>
  );
};

export default ViolationBar;
