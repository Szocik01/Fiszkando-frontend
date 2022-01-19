import styles from "./styles/QuestionBaseGenerator.module.css";
// import QuestionsBase from "./Questions_base";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QusetionItem from "./QuestionItem";

const QuestionBaseGenerator = () => {
  const history = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const selectedCourse = useSelector((state) => state.selectedCourse);
  const auth = useSelector((state) => state.autoIndentification);
  const [loading, setLoading] = useState(true);

  const sendQuestions = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/get-all", {
        method: "POST",
        body: JSON.stringify({
          courseId: selectedCourse.id,
        }),
        headers: {
          uid: auth.uid,
          token: auth.token,
          remeberMe: auth.remeberMe,
          "Content-Type": "application/json",
        },
      });
      const parsedResponse = await res.json();
      if (res.ok) {
        setAllQuestions(parsedResponse);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [auth, history]);
  useEffect(() => {
    if (!selectedCourse.id) {
      console.log("ok");
      return history("/question_base");
    }
    sendQuestions();
  }, [sendQuestions]);

  return (
    <div className={styles.container}>
      <ul className={styles.questions__container}>
        {allQuestions.map((q) => (
          <QusetionItem
            key={q._id}
            question={q.question}
            answears={q.correctAnswears}
          />
        ))}
      </ul>
    </div>
  );
};

export default QuestionBaseGenerator;
