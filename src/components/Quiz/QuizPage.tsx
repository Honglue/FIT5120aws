import React, { useState } from "react";
import "./Quiz.css";
import NavigationBar from "./NavigationBar";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

interface QuizPageProps {
  finishQuiz: () => void;
  goToWelcome: () => void;
  goToSummary: () => void;
}

const questions: Question[] = [
  // Macronutrients
  {
    question: "What is the main function of carbohydrates in the body?",
    options: ["Energy", "Bone Health", "Muscle Repair", "Vision"],
    correctAnswer: "Energy",
    category: "Macronutrients",
  },
  {
    question:
      "Which macronutrient is essential for building and repairing muscles?",
    options: ["Carbohydrates", "Fats", "Proteins", "Fiber"],
    correctAnswer: "Proteins",
    category: "Macronutrients",
  },
  {
    question: "What is the recommended daily intake of fiber for adults?",
    options: ["10g", "20g", "30g", "50g"],
    correctAnswer: "30g",
    category: "Macronutrients",
  },

  // Micronutrients
  {
    question: "Which vitamin is essential for vision and immune function?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin B12"],
    correctAnswer: "Vitamin A",
    category: "Micronutrients",
  },
  {
    question: "Calcium is important for which part of the body?",
    options: ["Skin", "Bones", "Lungs", "Liver"],
    correctAnswer: "Bones",
    category: "Micronutrients",
  },
  {
    question: "Which mineral helps regulate fluid balance in the body?",
    options: ["Iron", "Zinc", "Sodium", "Potassium"],
    correctAnswer: "Sodium",
    category: "Micronutrients",
  },

  // Healthy Eating Habits
  {
    question:
      "What is the recommended portion size for fruits and vegetables on your plate?",
    options: ["1/4", "1/3", "1/2", "3/4"],
    correctAnswer: "1/2",
    category: "Healthy Eating Habits",
  },
  {
    question: "How many cups of water should an average adult drink daily?",
    options: ["4 cups", "6 cups", "8 cups", "10 cups"],
    correctAnswer: "8 cups",
    category: "Healthy Eating Habits",
  },
  {
    question:
      "Which type of fat should you limit to reduce the risk of heart disease?",
    options: [
      "Trans fats",
      "Monounsaturated fats",
      "Polyunsaturated fats",
      "Omega-3 fats",
    ],
    correctAnswer: "Trans fats",
    category: "Healthy Eating Habits",
  },
  {
    question:
      "What is the importance of breakfast in maintaining a healthy diet?",
    options: [
      "Boosts energy",
      "Improves bone health",
      "Reduces sodium intake",
      "Increases sugar levels",
    ],
    correctAnswer: "Boosts energy",
    category: "Healthy Eating Habits",
  },
];

const QuizPage: React.FC<QuizPageProps> = ({
  finishQuiz,
  goToWelcome,
  goToSummary,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const handleAnswerSelection = (option: string) => {
    if (!showSolution) {
      setSelectedAnswer(option);
    }
  };

  const checkSolution = () => {
    setShowSolution(true);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowSolution(false);
  };

  const previousQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setSelectedAnswer(null);
    setShowSolution(false);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setSelectedAnswer(null);
    setShowSolution(false);
  };

  return (
    <div>
      <div className="quiz-container">
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion].question}</p>
          {questions[currentQuestion].options.map((option) => (
            <div
              key={option}
              className={`option ${
                selectedAnswer === option ? "selected" : ""
              } ${showSolution ? "disabled-option" : ""}`}
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </div>
          ))}
          <button
            className="check-btn"
            onClick={checkSolution}
            disabled={!selectedAnswer || showSolution}
          >
            Check Solution
          </button>
        </div>

        {showSolution && (
          <div className="solution-section">
            <h3>Answer</h3>
            <p>
              {questions[currentQuestion].correctAnswer === selectedAnswer
                ? "Correct!"
                : "Incorrect!"}
            </p>
            <p>
              Correct answer:{" "}
              <strong>{questions[currentQuestion].correctAnswer}</strong>
            </p>
            <div className="navigation-buttons">
              {currentQuestion > 0 && (
                <button className="prev-btn" onClick={previousQuestion}>
                  Previous Question
                </button>
              )}
              {currentQuestion < questions.length - 1 ? (
                <button className="next-btn" onClick={nextQuestion}>
                  Next Question
                </button>
              ) : (
                <button className="finish-btn" onClick={finishQuiz}>
                  Finish Quiz
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <NavigationBar
        questions={questions}
        currentQuestion={currentQuestion}
        goToWelcome={goToWelcome}
        goToSummary={goToSummary}
        goToQuestion={goToQuestion}
      />
    </div>
  );
};

export default QuizPage;
