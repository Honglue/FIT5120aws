import React from "react";
import "./SummaryPage.css";
import { Link } from "react-router-dom";

interface SummaryPageProps {
  score: number;
  totalQuestions: number;
  goToWelcome: () => void;
}

const SummaryPage: React.FC<SummaryPageProps> = ({
  score,
  totalQuestions,
  goToWelcome,
}) => {
  return (
    <div className="summary-page">
      <div className="welcome-page">
        {/* Left Section: Intro Text */}
        <div className="left-section">
          <h2>Congratulations on finishing the quiz!</h2>
          <p className="lead">
            Your Final Score is{" "}
            <span
              style={{ color: "#6366f1", fontWeight: "bold", fontSize: "30px" }}
            >
              {score} / {totalQuestions}
            </span>
          </p>
          <p className="lead intro-text">
            Well done on completing the quiz! You've tested your nutrition
            knowledge and gained valuable insights. Check your results to see
            where you did well and where you can improve. Keep learning and stay
            healthy!
          </p>
          <button onClick={goToWelcome}>Retake Quiz</button>
        </div>

        {/* Right Section: Image and Button */}
        <div className="right-section">
          <div className="quiz-summary-content" />
        </div>
      </div>

      <p className="link-page" style={{ fontSize: "16px" }}>
        Curious about essential nutritional information for Victoria?
        <Link to="/info" className="highlighted-link">
          Discover More.
        </Link>
      </p>
    </div>
  );
};

export default SummaryPage;
