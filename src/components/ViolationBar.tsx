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
}

const ViolationBar: React.FC<ViolationBarProps> = ({
  nutritionId,
  low,
  medium,
  high,
}) => {
  return (
    <div className="violation-bar-container my-2 p-3 rounded bg-light">
      <div className="d-flex align-items-center mb-3">
        <h5>{variableMap[nutritionId]}</h5>
      </div>

      {/* Custom Progress Bar with Three Sections */}
      <div
        className="d-flex"
        style={{ height: "20px", width: "100%", borderRadius: "4px" }}
      >
        {/* Low Section */}
        <div
          style={{
            width: "33.33%",
            position: "relative",
            backgroundColor: "#e0e0e0",
            marginRight: "4px",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              width: `${(low / 100) * 100}%`,
              height: "100%",
              backgroundColor: "#A5B4FC", // Light shade of #6366F1
              borderRadius: "4px",
              transition: "width 0.5s ease",
            }}
          ></div>
        </div>

        {/* Medium Section */}
        <div
          style={{
            width: "33.33%",
            position: "relative",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            marginRight: "4px",
          }}
        >
          <div
            style={{
              width: `${(medium / 100) * 100}%`,
              height: "100%",
              backgroundColor: "#818CF8", // Medium shade of #6366F1
              borderRadius: "4px",
              transition: "width 0.5s ease",
            }}
          ></div>
        </div>

        {/* High Section */}
        <div
          style={{
            width: "33.33%",
            position: "relative",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              width: `${(high / 100 >= 0.33 ? 1.0 : high / 100) * 100}%`,
              height: "100%",
              backgroundColor: "#6366F1", // Original shade of #6366F1
              transition: "width 0.5s ease",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      </div>

      {/* Info Section */}
      <div className="d-flex justify-content-between mt-3">
        <div className="text-center">
          <div className="">Low</div>
        </div>
        <div className="text-center">
          <div className="">Normal</div>
        </div>
        <div className="text-center">
          <div className="">High</div>
        </div>
      </div>
    </div>
  );
};

export default ViolationBar;
