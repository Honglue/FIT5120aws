import React from "react";
import FoodCard from "./FoodCard";

interface MilkProductCardProps {
  data: {
    milk?: string;
  } | null;
}

const MilkProductCard: React.FC<MilkProductCardProps> = ({ data }) => {
  const milkPages = [
    {
      description: "cup of milk",
      quantity: "1",
      kJ: "600",
      image: "/images/recommend/milk1.jpg",
    },
    {
      description: "slices of hard cheese",
      quantity: "2",
      kJ: "600",
      image: "/images/recommend/milk2.jpg",
    },
    {
      description: "cup of yoghurt",
      quantity: "0.5",
      kJ: "600",
      image: "/images/recommend/milk3.jpg",
    },
    {
      description: "cup of soy beverage",
      quantity: "1",
      kJ: "600",
      image: "/images/recommend/milk4.jpg",
    },
  ];

  const milkServes = data?.milk ? parseFloat(data.milk) : 0;

  return <FoodCard title="Milk Products" data={milkServes} pages={milkPages} />;
};

export default MilkProductCard;
