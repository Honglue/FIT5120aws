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
          Answer{" "}
          <span style={{ color: "#6366f1" }}>10 multiple-choice questions</span>{" "}
          and see how well you understand essential nutritional concepts.
          <br /> <br />
          Learn more about maintaining a healthy diet and get personalised
          insights with this fun quiz!
        </p>
        <button className="btn btn-custom btn-primary" onClick={startQuiz}>
          Start Quiz!
        </button>
      </div>

      {/* Right Section: Image and Button */}
      <div className="right-section">
        <div className="quiz-content">
          <div className="quiz-overlay"></div>
          <div className="quiz-content-text text-start"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
