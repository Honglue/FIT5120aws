import React from "react";
import FoodCard from "./FoodCard";

interface GrainsCardProps {
  data: {
    grain?: string;
  } | null;
}

const GrainsCard: React.FC<GrainsCardProps> = ({ data }) => {
  const grainPages = [
    {
      description: "slice of bread",
      quantity: "1",
      kJ: "500",
      image: "/images/recommend/grain1.jpg",
    },
    {
      description: "medium roll bread",
      quantity: "0.5",
      kJ: "500",
      image: "/images/recommend/grain2.jpg",
    },
    {
      description: "cup cooked porridge",
      quantity: "0.5",
      kJ: "500",
      image: "/images/recommend/grain3.jpg",
    },
    {
      description:
        "cup cooked rice, pasta, noodles, barley, semolina, bulgur or quinoa",
      quantity: "0.5",
      kJ: "500",
      image: "/images/recommend/grain4.jpg",
    },
    {
      description: "cup muesli",
      quantity: "0.25",
      kJ: "500",
      image: "/images/recommend/grain5.jpg",
    },
    {
      description: "crispbreads",
      quantity: "3",
      kJ: "500",
      image: "/images/recommend/grain6.jpg",
    },
  ];

  const grainServes = data?.grain ? parseFloat(data.grain) : 0;

  return <FoodCard title="Grains" data={grainServes} pages={grainPages} />;
};

export default GrainsCard;
