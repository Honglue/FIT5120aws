import React from "react";
import "./SummaryPage.css";
import { useNavigate } from "react-router-dom";

interface SummaryPageProps {
  score: number;
  totalQuestions: number;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ score, totalQuestions }) => {
  const navigate = useNavigate();

  const handleRetakeQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="summary-page">
      <h2>Quiz Summary</h2>
      <p>
        Your Score: {score} / {totalQuestions}
      </p>
      <button onClick={handleRetakeQuiz}>Retake Quiz</button>
    </div>
  );
};

export default SummaryPage;
