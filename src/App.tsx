import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';
//Types
import { QuestionState, Difficulty } from './API'; 
//Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))
  console.log(questions)

  const startTrivia = async () => {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      )

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if(!gameOver) {
        //User answer
        const answer = e.currentTarget.value;
        //Check answer against correct answer
        const correct = questions[number].correct_answer === answer;
        //Add Score if answer is correct
        if(correct) setScore(prev => prev + 1)
        //Save answer in the array for user answers
        const answerObject = {
          question: questions[number].question,
          answer: answer,
          correct: correct,
          correctAnswer: questions[number].correct_answer,
        };
        setUserAnswers((prev) => [...prev, answerObject]);
      }
  }

  const nextQuestion = () => {
    //Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion);
    }

  }

  return (
    <>
      <GlobalStyle />
      {/* <div className="App"> */}
      <Wrapper>
        <h1>Quiza</h1>
        {/*Display button only when the game is over or when the game is at the last question*/}
        {
          gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className='start' onClick={startTrivia} value="Start">Start</button>
          ) : null
        }

        {!gameOver ? <p className='score'>Score: {score} </p> : null}
        
        {loading && <p>Loading Questions ...</p>}

        {!loading && !gameOver && (
              <QuestionCard  
                questionNumber={number + 1} 
                totalQuestions={TOTAL_QUESTIONS} 
                question={questions[number].question} 
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
              />
          )}

          {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
            <button className='next' onClick={nextQuestion} value='Next Question'>Next Question</button>

          ) : null}

      </Wrapper>
      {/* </div> */}
    </>
  );
}

export default App;
