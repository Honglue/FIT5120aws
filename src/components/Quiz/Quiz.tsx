import React, { useState } from "react";
import WelcomePage from "./WelcomePage";
import QuizPage from "./QuizPage";
import SummaryPage from "./SummaryPage";

const Quiz: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [score] = useState<number>(0);

  const goToWelcome = () => {};

  const goToSummary = () => {};

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const finishQuiz = () => {
    setQuizFinished(true);
  };

  return (
    <div style={{ paddingTop: "60px" }}>
      {!quizStarted && <WelcomePage startQuiz={startQuiz} />}
      {quizStarted && !quizFinished && (
        <QuizPage
          finishQuiz={finishQuiz}
          goToWelcome={goToWelcome}
          goToSummary={goToSummary}
        />
      )}
      {quizFinished && <SummaryPage score={score} totalQuestions={10} />}
    </div>
  );
};

export default Quiz;
