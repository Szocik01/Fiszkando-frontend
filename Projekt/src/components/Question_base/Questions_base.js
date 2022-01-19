import styles from './Questions_base.module.css';
import TitleContainerCard from '../UI/TitleContainerCard';
import ContainerCard from '../UI/ContainerCard';
import { useState } from "react";
const QuestionsBase = (props) =>{
  const [selectedAnswearsIndexes, setSelectedAnswearIndexes] = useState([]);
  const selectAnswearHandler = (index) => {
    setSelectedAnswearIndexes(index);
  };

    return (
        <div className={styles.main}>
          <div className={styles.managerContainer}>
            <svg
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
                trueAnsweared={true}
                sellectHandler={selectAnswearHandler}
              />
            ))}
          </div>
        </div>
      );


};

export default QuestionsBase;