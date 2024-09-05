import React from 'react';
import './Recommend.css';
import InputBar from './InputBar'; // 导入 InputBar 组件

interface NutritionData {
  type: string;
  value: string;
  equivalent: string;
  image: string;
}

const nutritionData: NutritionData[] = [
  { type: 'Protein', value: '100 KJ', equivalent: '2 x Drumstick', image: 'public/images/Drumstick.pic.jpg' },
  { type: 'Vitamin A', value: '100 KJ', equivalent: '1 x Cheese', image: 'public/images/Cheese.pic.jpg' },
  { type: 'Vitamin B', value: '100 KJ', equivalent: '1 x Pack of Nuts', image: 'public/images/Nuts.pic.jpg' },
  { type: 'Vitamin C', value: '100 KJ', equivalent: '3 x Oranges', image: 'public/images/Orange.pic.jpg' },
];

const Recommend: React.FC = () => {
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
              <p className="nutrition-value">{item.value}</p>
            </div>
            <div className="nutrition-card-body">
              <p className="nutrition-description">
                Many refugee families arriving in Victoria come from conflict-ridden backgrounds where survival was their primary focus, leaving
              </p>
              <p className="nutrition-equivalent">Equivalent to {item.equivalent}</p>
              <img src={item.image} alt={item.type} className="nutrition-image" />
              <div className="nutrition-navigation">
                <button className="nav-button">←</button>
                <button className="nav-button">→</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
