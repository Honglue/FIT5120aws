import React from 'react';
import { useNavigate } from 'react-router-dom';  // 引入 useNavigate 钩子
import './Hero.css';

function Hero() {
  const navigate = useNavigate();  // 使用 useNavigate 创建导航函数

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Better Nutrition</h1>
        <p>A resource for Refugee families for a healthier lifestyle</p>
        <button className="learn-more-button" onClick={() => navigate('/details')}>Learn More</button>  {/* 修改为导航功能 */}
      </div>
      <div className="hero-image">
        <img src="path-to-your-vegetable-image" alt="Vegetables" />
      </div>
    </section>
  );
}

export default Hero;
