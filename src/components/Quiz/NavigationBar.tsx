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
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  questions,
  currentQuestion,
  goToWelcome,
  goToQuestion,
}) => {
  return (
    <div className="navigation-bar">
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

      <button className="nav-btn-home" onClick={goToWelcome}>
        End Quiz
      </button>
    </div>
  );
};

export default NavigationBar;
