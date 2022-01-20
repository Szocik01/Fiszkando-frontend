import styles from "./styles/Question.module.css";
import { useState } from "react";
import TitleContainerCard from "../UI/TitleContainerCard";
import ContainerCard from "../UI/ContainerCard";
import { useNavigate } from "react-router-dom";

const Question = (props) => {
  const [changeTitle, setChangeTitle] = useState(false);
  const [selectedAnswearsIndexes, setSelectedAnswearIndexes] = useState([]);
  const [answearIsCorrect, setAnswearIsCorrect] = useState(true);
  const [isAnsweared, setIsAnsweared] = useState(false);
  const [reset, setReset] = useState(true);
  const history = useNavigate();

  const switchQuestionHandler = () => {
    setAnswearIsCorrect(true);
    setIsAnsweared(false);
    setReset((p) => !p);
    setAnswearIsCorrect(true);
    setSelectedAnswearIndexes([]);
    setChangeTitle(false);
    props.switchQuestion();
  };

  const selectAnswearHandler = (index) => {
    setSelectedAnswearIndexes((p) => {
      const ind = p.findIndex((i) => +i === +index);
      if (ind < 0) {
        return [...p, index];
      } else {
        const filteredArr = p.filter((i) => i !== index);
        return filteredArr;
      }
    });
  };

  const checkAnswear = () => {
    let isCorrect = true;
    const correctAnswearIndexes = props.currentQuestion.allAnswears
      .filter((a) => a.isCorrect)
      .map((a) => a.index);
    if (
      selectedAnswearsIndexes.length < correctAnswearIndexes.length ||
      selectedAnswearsIndexes.length > correctAnswearIndexes.length
    ) {
      isCorrect = false;
    }
    selectedAnswearsIndexes.forEach((a) => {
      let isCorr = 0;
      for (const corrInd of correctAnswearIndexes) {
        if (+corrInd === +a) {
          isCorr = 1;
          break;
        }
      }
      if (!isCorr) {
        isCorrect = false;
      }
    });
    setIsAnsweared(true);
    setChangeTitle(true);
    if (!isCorrect) {
      setAnswearIsCorrect(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.managerContainer}>
        <div className={styles.svgContainer}>
          <svg
            className={styles.svg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
          <p>Zgłoś pytanie</p>
        </div>
        <div
          className={styles.svgContainer}
          onClick={() => history("/chooseCourse/questions")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <rect fill="none" height="24" width="24" />
            <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12.06,19v-2.01c-0.02,0-0.04,0-0.06,0 c-1.28,0-2.56-0.49-3.54-1.46c-1.71-1.71-1.92-4.35-0.64-6.29l1.1,1.1c-0.71,1.33-0.53,3.01,0.59,4.13c0.7,0.7,1.62,1.03,2.54,1.01 v-2.14l2.83,2.83L12.06,19z M16.17,14.76l-1.1-1.1c0.71-1.33,0.53-3.01-0.59-4.13C13.79,8.84,12.9,8.5,12,8.5c-0.02,0-0.04,0-0.06,0 v2.15L9.11,7.83L11.94,5v2.02c1.3-0.02,2.61,0.45,3.6,1.45C17.24,10.17,17.45,12.82,16.17,14.76z" />
          </svg>
          <p>Wybierz inny kurs</p>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <TitleContainerCard
          key={props.currentQuestion._id}
          title={props.currentQuestion.question.value}
          image={props.currentQuestion.question.url}
          foto={props.currentQuestion.question.type === "mixed" ? true : false}
        />
      </div>
      <div className={styles.couestionsContener}>
        {props.currentQuestion.allAnswears.map((q, index) => (
          <ContainerCard
            key={index}
            index={index}
            title={q.value}
            isCorrect={q.isCorrect}
            image={q.url}
            foto={q.type === "mixed" ? true : false}
            sellectHandler={selectAnswearHandler}
            isAnsweared={isAnsweared}
            answerIsTrue={answearIsCorrect}
            reset={reset}
          />
        ))}
      </div>
      <div className={styles.btnContainer}>
        <button
          type="button"
          onClick={!changeTitle ? checkAnswear : switchQuestionHandler}
          className={styles.btn}
        >
          {!changeTitle ? "Sprawdź" : "Następne Pytanie"}
        </button>
      </div>
    </div>
  );
};

export default Question;
