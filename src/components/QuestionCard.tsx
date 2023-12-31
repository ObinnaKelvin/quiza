import React from 'react';
//Types
import { AnswerObject } from '../App';

//Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.style';

type Props = {
    question: string;
    answers: string[];
    // callback: any;
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;  //..or undefined
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) => {
  return (
    // <div>
    <Wrapper>
        <p className="number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question}} />
        <div>
            {answers.map(answer => (
                //<div key={answer}>
                <ButtonWrapper 
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked = {userAnswer?.answer === answer}
                >
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </ButtonWrapper>
                //</div>
            ))}
        </div>
    </Wrapper>
    //</div>
  )
}

export default QuestionCard