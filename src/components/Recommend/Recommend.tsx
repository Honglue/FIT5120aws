import React from 'react';
import './Recommend.css';

interface NutritionData {
  type: string;
  value: string;
  equivalent: string;
  image: string;
}

const nutritionData: NutritionData[] = [
  { type: 'Protein', value: '100 KJ', equivalent: '2 x Drumstick', image: '/images/drumstick.png' },
  { type: 'Vitamin A', value: '100 KJ', equivalent: '1 x Cheese', image: '/images/cheese.png' },
  { type: 'Vitamin B', value: '100 KJ', equivalent: '1 x Pack of Nuts', image: '/images/nuts.png' },
  { type: 'Vitamin C', value: '100 KJ', equivalent: '3 x Oranges', image: '/images/oranges.png' },
];

const Recommend: React.FC = () => {
  return (
    <div className="nutrition-container">
      {nutritionData.map((item, index) => (
        <div className="nutrition-card" key={index}>
          <h2>{item.type}</h2>
          <p className="nutrition-value">{item.value}</p>
          <p className="nutrition-equivalent">Equivalent to {item.equivalent}</p>
          <img src={item.image} alt={item.type} className="nutrition-image" />
        </div>
      ))}
    </div>
  );
};

export default Recommend;
