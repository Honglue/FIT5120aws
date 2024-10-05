import React, { useState } from "react";
import WelcomePage from "./WelcomePage";
import QuizPage from "./QuizPage";
import SummaryPage from "./SummaryPage";

const Quiz: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0); // Score management

  // Reset the quiz to the welcome page
  const goToWelcome = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setScore(0); // Reset the score
  };

  // Navigate to the summary page when the quiz is done
  const goToSummary = (finalScore: number) => {
    setQuizFinished(true);
    setScore(finalScore); // Pass the final score to the summary page
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div style={{ paddingTop: "60px" }}>
      {/* Display Welcome Page */}
      {!quizStarted && <WelcomePage startQuiz={startQuiz} />}

      {/* Display Quiz Page */}
      {quizStarted && !quizFinished && (
        <QuizPage finishQuiz={goToSummary} goToWelcome={goToWelcome} />
      )}

      {/* Display Summary Page */}
      {quizFinished && <SummaryPage score={score} totalQuestions={10} />}
    </div>
  );
};

export default Quiz;
