import React from "react";
import "./WelcomePage.css";

interface WelcomePageProps {
  startQuiz: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ startQuiz }) => {
  return (
    <div className="welcome-page">
      {/* Left Section: Intro Text */}
      <div className="left-section">
        <h2>Nutrition Quiz</h2>
        <p className="lead intro-text">
          Answer 10 multiple-choice questions and see how well you understand
          essential nutritional concepts.
          <br /> <br />
          Learn more about maintaining a healthy diet and get personalized
          insights with this fun quiz!
        </p>
        <div className="button-container">
          <button className="btn btn-custom btn-primary" onClick={startQuiz}>
            Start Quiz!
          </button>
        </div>
      </div>

      {/* Right Section: Image and Button */}
      <div className="right-section">
        <div className="download-content">
          <div className="download-overlay"></div>
          <div className="download-content-text text-start"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
