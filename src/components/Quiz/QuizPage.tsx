const questions: Question[] = [
  {
    question: "Which food is rich in protein?",
    options: ["Apples", "Chicken", "Rice", "Potatoes"],
    correctAnswer: "Chicken",
    category: "Macronutrients",
    explanation:
      "Chicken is rich in high-quality protein, which helps repair tissues and strengthen the immune system.",
  },
  {
    question: "Which food is good for bone health?",
    options: ["Milk", "Candy", "Potato chips", "Cookies"],
    correctAnswer: "Milk",
    category: "Micronutrients",
    explanation:
      "Milk is rich in calcium, which helps keep bones and teeth healthy.",
  },
  {
    question: "What is a healthy snack?",
    options: ["Potato chips", "Chocolate", "Nuts", "Candy"],
    correctAnswer: "Nuts",
    category: "Healthy Eating Habits",
    explanation:
      "Nuts contain healthy fats and protein, making them a good healthy snack, while other options often contain too much sugar or fat.",
  },
  {
    question: "Which food provides energy?",
    options: ["Vegetables", "Fruits", "Bread", "Milk"],
    correctAnswer: "Bread",
    category: "Macronutrients",
    explanation:
      "Bread is mainly composed of carbohydrates, which can provide energy.",
  },
  {
    question: "Which ingredient should we limit our intake?",
    options: ["Protein", "Sugar", "Vitamins", "Water"],
    correctAnswer: "Sugar",
    category: "Healthy Eating Habits",
    explanation:
      "Excessive intake of sugar can lead to health problems such as obesity and diabetes, so it should be limited.",
  },
  {
    question: "Which beverage has the lowest sugar content?",
    options: ["Carbonated drinks", "Juice", "Water", "Sports drinks"],
    correctAnswer: "Water",
    category: "Healthy Eating Habits",
    explanation:
      "Water is the best choice without sugar and can keep the body hydrated.",
  },
  {
    question: "Which of the following foods is good for heart health?",
    options: ["Red meat", "Deep-sea fish", "Desserts", "Fried chicken"],
    correctAnswer: "Deep-sea fish",
    category: "Healthy Eating Habits",
    explanation:
      "Deep-sea fish like salmon are rich in omega-3 fatty acids, which reduce the risk of heart disease.",
  },
  {
    question: "Which food is a healthy source of fat?",
    options: ["Olive oil", "Butter", "Fried food", "Cream"],
    correctAnswer: "Olive oil",
    category: "Macronutrients",
    explanation:
      "Olive oil contains monounsaturated fat, which is good for heart health.",
  },
  {
    question: "Which food can provide calcium?",
    options: ["Spinach", "Bread", "Apple", "Chocolate"],
    correctAnswer: "Spinach",
    category: "Micronutrients",
    explanation: "Spinach contains calcium, which is good for bone health.",
  },
  {
    question: "What is a healthy breakfast choice?",
    options: ["Candy", "Oatmeal", "French fries", "Donuts"],
    correctAnswer: "Oatmeal",
    category: "Healthy Eating Habits",
    explanation:
      "Oatmeal is a nutritious breakfast choice that is high in fiber and energy.",
  },
];

import React, { useState } from "react";
import "./QuizPage.css";
import NavigationBar from "./NavigationBar";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
  explanation: string;
}
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
  explanation: string;
}

interface QuizPageProps {
  finishQuiz: (finalScore: number) => void; // Pass final score to summary
  goToWelcome: () => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ finishQuiz, goToWelcome }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0); // Track the score

  // Handle answer selection
  const handleAnswerSelection = (option: string) => {
    if (!showSolution) {
      setSelectedAnswer(option);
    }
  };

  // Check solution and update score
  const checkSolution = () => {
    setShowSolution(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1); // Increment score for correct answer
    }
  };

  // Move to the next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      finishQuiz(score); // Finish quiz and pass the final score
    }
    setSelectedAnswer(null);
    setShowSolution(false);
  };

  // Move to the previous question
  const previousQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setSelectedAnswer(null);
    setShowSolution(false);
  };

  // Handle navigation from the navigation bar
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(index);
      setSelectedAnswer(null);
      setShowSolution(false);
    }
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

          <div className="navigation-buttons">
            <button
              className="check-btn"
              onClick={checkSolution}
              disabled={!selectedAnswer || showSolution}
            >
              Check Solution
            </button>

            <div className="arrow-buttons">
              {currentQuestion > 0 && (
                <button className="prev-btn" onClick={previousQuestion}>
                  Previous
                </button>
              )}

              <button className="next-btn" onClick={nextQuestion}>
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next <i className="fas fa-arrow-right"></i>{" "}
                    {/* Right arrow */}
                  </>
                ) : (
                  "Finish Quiz"
                )}
              </button>
            </div>
          </div>
        </div>

        {showSolution && (
          <div className="solution-section">
            <h3 style={{ fontWeight: "medium" }}>Answer</h3>
            <p>
              {questions[currentQuestion].correctAnswer === selectedAnswer
                ? "Correct!"
                : "Incorrect!"}
            </p>
            <p>
              Correct answer:{" "}
              <strong>{questions[currentQuestion].correctAnswer}</strong>
            </p>
            <p>Explanation: {questions[currentQuestion].explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <NavigationBar
        questions={questions}
        currentQuestion={currentQuestion}
        goToQuestion={goToQuestion}
        goToWelcome={goToWelcome}
      />
    </div>
  );
};

export default QuizPage;
