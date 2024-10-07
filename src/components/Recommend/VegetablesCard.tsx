import React from "react";
import FoodCard from "./FoodCard";

interface VegetablesCardProps {
  data: {
    vegetable?: string;
  } | null;
}

const VegetablesCard: React.FC<VegetablesCardProps> = ({ data }) => {
  const vegetablePages = [
    {
      description: "cup of cooked broccoli, spinach, carrots or pumpkin",
      quantity: "0.5",
      kJ: "300",
      image: "/images/recommend/veg1.jpg",
    },
    {
      description: "cup cooked beans, peas or lentils",
      quantity: "0.5",
      kJ: "300",
      image: "/images/recommend/veg2.jpg",
    },
    {
      description: "cup of green leafy or raw salad vegetables",
      quantity: "1",
      kJ: "300",
      image: "/images/recommend/veg3.jpg",
    },
    {
      description: "cup of sweetcorn",
      quantity: "0.5",
      kJ: "300",
      image: "/images/recommend/veg4.jpg",
    },
    {
      description: "medium potato, sweet potato, taro or cassava",
      quantity: "0.5",
      kJ: "300",
      image: "/images/recommend/veg5.jpg",
    },
    {
      description: "medium tomato",
      quantity: "1",
      kJ: "300",
      image: "/images/recommend/veg6.jpg",
    },
  ];

  const vegetableServes = data?.vegetable ? parseFloat(data.vegetable) : 0;

  return (
    <FoodCard
      title="Vegetables"
      data={vegetableServes}
      pages={vegetablePages}
    />
  );
};

export default VegetablesCard;
