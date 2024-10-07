import React from "react";
import FoodCard from "./FoodCard";

interface FruitsCardProps {
  data: {
    fruit?: string;
  } | null;
}

const FruitsCard: React.FC<FruitsCardProps> = ({ data }) => {
  const fruitPages = [
    {
      description: "medium apple, banana, orange or pear",
      quantity: "1",
      kJ: "350",
      image: "/images/recommend/fruit1.jpg",
    },
    {
      description: "small apricots, kiwi fruits or plums",
      quantity: "2",
      kJ: "350",
      image: "/images/recommend/fruit2.jpg",
    },
    {
      description: "cup canned fruit with no added sugar",
      quantity: "1",
      kJ: "350",
      image: "/images/recommend/fruit3.jpg",
    },
    {
      description: "cup 100% fruit juice with no added sugar",
      quantity: "0.5",
      kJ: "350",
      image: "/images/recommend/fruit4.jpg",
    },
  ];

  const fruitServes = data?.fruit ? parseFloat(data.fruit) : 0;

  return <FoodCard title="Fruits" data={fruitServes} pages={fruitPages} />;
};

export default FruitsCard;
