import React from "react";
import FoodCard from "./FoodCard";

interface LeanMeatsCardProps {
  data: {
    "lean meat"?: string;
  } | null;
}

const LeanMeatsCard: React.FC<LeanMeatsCardProps> = ({ data }) => {
  const leanMeatPages = [
    {
      description:
        "g cooked lean meat of beef, veal, lamb, pork, kangaroo or goat",
      quantity: "65",
      kJ: "600",
      image: "/images/recommend/meat1.jpg",
    },
    {
      description: "g cooked poultry of skinless chicken or turkey",
      quantity: "80",
      kJ: "600",
      image: "/images/recommend/meat2.jpg",
    },
    {
      description: "g cooked fish fillet or small can of fish",
      quantity: "100",
      kJ: "600",
      image: "/images/recommend/meat3.jpg",
    },
    {
      description: "large eggs",
      quantity: "2",
      kJ: "600",
      image: "/images/recommend/meat4.jpg",
    },
  ];

  const leanMeatServes = data?.["lean meat"]
    ? parseFloat(data["lean meat"])
    : 0;

  return (
    <FoodCard title="Lean Meat" data={leanMeatServes} pages={leanMeatPages} />
  );
};

export default LeanMeatsCard;
