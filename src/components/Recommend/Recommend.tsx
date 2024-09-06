import React, { useState } from 'react';
import './Recommend.css';
import InputBar from './InputBar'; // 导入 InputBar 组件

interface NutritionData {
  type: string;
  value: number; // 热量的值改为数字类型
  equivalent: string;
  image: string;
}

const nutritionData: NutritionData[] = [
  { type: 'Protein', value: 100, equivalent: 'Drumstick', image: 'public/images/Drumstick.pic.jpg' },
  { type: 'Vitamin A', value: 100, equivalent: 'Cheese', image: 'public/images/Cheese.pic.jpg' },
  { type: 'Vitamin B', value: 100, equivalent: 'Pack of Nuts', image: 'public/images/Nuts.pic.jpg' },
  { type: 'Vitamin C', value: 100, equivalent: 'Oranges', image: 'public/images/Orange.pic.jpg' },
];

const Recommend: React.FC = () => {
  const [cardValues, setCardValues] = useState(nutritionData.map(() => 100));

  const handleDecrease = (index: number) => {
    setCardValues((prevValues) =>
      prevValues.map((value, i) => (i === index && value > 100 ? value - 100 : value))
    );
  };

  const handleIncrease = (index: number) => {
    setCardValues((prevValues) =>
      prevValues.map((value, i) => (i === index && value < 1000 ? value + 100 : value))
    );
  };

  return (
    <div>
      <InputBar /> {/* 添加 InputBar 组件 */}
      <div className="nutrition-header">
        <h2>Recommended Intake of Nutrition Per Day</h2> {/* 新增标题 */}
      </div>
      <div className="nutrition-container">
        {nutritionData.map((item, index) => (
          <div className="nutrition-card" key={index}>
            <div className="nutrition-card-header">
              <h2 className="nutrition-type">{item.type}</h2>
              <p className="nutrition-value">{cardValues[index]} KJ</p> {/* 显示当前热量 */}
            </div>
            <div className="nutrition-card-body">
              <p className="nutrition-description">
                Many refugee families arriving in Victoria come from conflict-ridden backgrounds where survival was their primary focus, leaving
              </p>
              <p className="nutrition-equivalent">
                Equivalent to <span>{cardValues[index] / 100} x {item.equivalent}</span>
              </p> {/* 显示当前食物数量 */}
              <img src={item.image} alt={item.type} className="nutrition-image" />
              <div className="nutrition-navigation">
                <button
                  className="nav-button"
                  onClick={() => handleDecrease(index)}
                  disabled={cardValues[index] === 100} /* 如果是100KJ则禁用左箭头 */
                >
                  ←
                </button>
                <button
                  className="nav-button"
                  onClick={() => handleIncrease(index)}
                  disabled={cardValues[index] === 1000} /* 如果是1000KJ则禁用右箭头 */
                >
                  →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
