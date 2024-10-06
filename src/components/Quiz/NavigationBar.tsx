import React from "react";
import "./Quiz.css";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

interface NavigationBarProps {
  questions: Question[];
  currentQuestion: number;
  goToWelcome: () => void;
  goToQuestion: (index: number) => void;
  finishQuiz: (finalScore: number) => void;
  score: number;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  questions,
  currentQuestion,
  goToWelcome,
  goToQuestion,
  finishQuiz,
  score,
}) => {
  return (
    <div className="navigation-bar">
      <button className="nav-btn-home" onClick={goToWelcome}>
        Back to Home
      </button>

      <div className="nav-questions">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`nav-btn ${index === currentQuestion ? "active" : ""}`}
            onClick={() => goToQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button className="nav-btn-summary" onClick={() => finishQuiz(score)}>
        End Quiz
      </button>
    </div>
  );
};

export default NavigationBar;
