import { useState } from "react";
import styles from "./styles/QuestionItem.module.css";

const QusetionItem = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandHandler = () => setIsExpanded((p) => !p);
  return (
    <li
      className={`${styles.question__container} ${
        isExpanded && styles.question__expanded
      }`}
      onClick={expandHandler}
    >
      <div className={`${styles.question__heading}`}>
        {props.question.value}
        <div className={`${styles.svg} ${!isExpanded && styles.rotated_svg}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          </svg>
        </div>
      </div>
      {props.question.type === "mixed" && (
        <div className={styles.img}>
          <img src={props.question.url} alt="qestion" />
        </div>
      )}
      <div className={styles.answears__container}>
        <h3 className={styles.h1}>Odpowiedzi:</h3>
        {props.answears.map((a, index) => (
          <div className={styles.answear} key={index}>
            {a.value}
            {a.type === "mixed" && (
              <div className={styles.img}>
                <img src={props.question.url} alt="qestion" />
              </div>
            )}
          </div>
        ))}
      </div>
    </li>
  );
};

export default QusetionItem;
