import styles from "./styles/Question.module.css";
import { useState } from "react";
import TitleContainerCard from "../UI/TitleContainerCard";
import ContainerCard from "../UI/ContainerCard";

const Question = (props) => {
  const [changeTitle, setChangeTitle] = useState(false);
  const [selectedAnswearsIndexes, setSelectedAnswearIndexes] = useState([]);
  const [answearIsCorrect, setAnswearIsCorrect] = useState(true);
  const [isAnsweared, setIsAnsweared] = useState(false);
  const [reset, setReset] = useState(true);

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
        <svg
          onClick={props.reporthandler}
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 0 24 24"
          width="40px"
        >
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
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
