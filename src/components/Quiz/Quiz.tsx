import React, { useState } from "react";
import WelcomePage from "./WelcomePage";
import QuizPage from "./QuizPage";
import SummaryPage from "./SummaryPage";

const Quiz: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const totalQuestions = 10;

  const goToWelcome = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setScore(0);
  };

  const goToSummary = (finalScore: number) => {
    setQuizFinished(true);
    setScore(finalScore);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
  };

  return (
    <div style={{ paddingTop: "60px" }}>
      {/* Display Welcome Page */}
      {!quizStarted && !quizFinished && <WelcomePage startQuiz={startQuiz} />}

      {/* Display Quiz Page */}
      {quizStarted && !quizFinished && (
        <QuizPage finishQuiz={goToSummary} goToWelcome={goToWelcome} />
      )}

      {/* Display Summary Page */}
      {quizFinished && (
        <SummaryPage
          score={score}
          totalQuestions={totalQuestions}
          goToWelcome={goToWelcome}
        />
      )}
    </div>
  );
};

export default Quiz;
