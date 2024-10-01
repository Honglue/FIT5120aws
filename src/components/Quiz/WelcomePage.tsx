import React from "react";
import "./Quiz.css";

interface WelcomePageProps {
  startQuiz: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ startQuiz }) => {
  return (
    <div className="welcome-page">
      {/* Banner Section */}
      <div className="download-content">
        <div className="download-overlay"></div>
        <div className="download-content-text text-start">
          <h2>Nutrition Quiz</h2>
        </div>
        <div className="button-container"></div>
      </div>

      <p className="lead intro-text text-left">
        Test your knowledge on Macronutrients, Micronutrients, and Healthy
        Eating Habits.
        <br /> <br /> Answer 10 multiple-choice questions and see how well you
        understand essential nutritional concepts.
        <br /> <br /> Learn more about maintaining a healthy diet and get
        personalized insights with this fun quiz!
      </p>

      <div className="text-center">
        <button className="btn btn-custom btn-primary" onClick={startQuiz}>
          Start Quiz!
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
