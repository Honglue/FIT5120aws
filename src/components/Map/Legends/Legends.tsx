import React from "react";

interface LegendProps {
  isGoodNutrition: boolean;
}

const Legend: React.FC<LegendProps> = ({ isGoodNutrition }) => {
  return (
    <div
      style={{
        margin: "30px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        maxWidth: "100%",
        gap: "20px",
      }}
    >
      {isGoodNutrition ? (
        <>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                backgroundColor: "#A7F3D0",
                marginRight: "6px",
                borderRadius: "3px",
              }}
            ></span>
            <span>Low: Needs improvement</span>
          </div>

          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                backgroundColor: "#6EE7B7",
                marginRight: "6px",
                borderRadius: "3px",
              }}
            ></span>
            <span>Medium: Adequate</span>
          </div>

          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                backgroundColor: "#34D399",
                marginRight: "6px",
                borderRadius: "3px",
              }}
            ></span>
            <span>High: Excellent</span>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                backgroundColor: "#FCA5A5",
                marginRight: "10px",
                borderRadius: "3px",
              }}
            ></span>
            <span>Low: Ideal</span>
          </div>

          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                backgroundColor: "#F87171",
                marginRight: "10px",
                borderRadius: "3px",
              }}
            ></span>
            <span>Medium: Warning level</span>
          </div>

          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                backgroundColor: "#EF4444",
                marginRight: "10px",
                borderRadius: "3px",
              }}
            ></span>
            <span>High: Risk level</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Legend;
