import React from "react";

interface SummaryPageProps {
  score: number;
  totalQuestions: number;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ score, totalQuestions }) => {
  return (
    <div className="summary-page">
      <h2>Quiz Summary</h2>
      <p>
        Your Score: {score} / {totalQuestions}
      </p>
      <button onClick={() => window.location.reload()}>Retake Quiz</button>
    </div>
  );
};

export default SummaryPage;
