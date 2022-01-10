import styles from "./SingleCoustions.module.css";
import ContainerCard from "../components/UI/ContainerCard";
import logo from "../image/banner.jpg";
import TitleContainerCard from "../components/UI/TitleContainerCard";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SingleCoustions = () => {
  const history = useNavigate();
  const [changeTitle, setChangeTitle] = useState(false);
  const [questionsTable, setQuestionsTable] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allAnswears, setAllAnswears] = useState([]);
  const [loading, setLoading] = useState(true);
  const courseId = useSelector((state) => state.autoCurseId);
  const auth = useSelector((state) => state.autoIndentification);

  const buttonHandler = () => {
    setChangeTitle((prev) => !prev);
  };

  const sendQuestions = useCallback(async () => {
    const TMP = [];
    const res = await fetch("http://localhost:8080/get-all", {
      method: "POST",
      body: JSON.stringify({
        courseId: courseId.id,
      }),
      headers: {
        uid: auth.uid,
        token: auth.token,
        remeberMe: auth.remeberMe,
        "Content-Type": "application/json",
      },
    });
    const parsedResponse = await res.json();
    if (res.status === 404) {
      return history(`/questions`);
    }

    parsedResponse.forEach((q) => TMP.push(q));
    const shuffledArray = TMP.sort((a, b) => 0.5 - Math.random());
    console.log(shuffledArray);
    setQuestionsTable(shuffledArray);

    let ANS_TMP = [];

    shuffledArray[currentIndex].correctAnswears.forEach((a) => ANS_TMP.push(a));
    shuffledArray[currentIndex].falseAnswears.forEach((a) => ANS_TMP.push(a));

    ANS_TMP = ANS_TMP.sort((a, b) => 0.5 - Math.random());
    setAllAnswears(ANS_TMP);

    setLoading(false);
  }, [auth.uid, auth.token, auth.remeberMe, courseId, history]);

  useEffect(() => {
    sendQuestions();
  }, [sendQuestions]);

  return (
    <div className={styles.container}>
      {!loading && (
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
              title={questionsTable[currentIndex].question.value}
              image={questionsTable[currentIndex].question.url}
              foto={
                questionsTable[currentIndex].question.type === "mixed"
                  ? true
                  : false
              }
            />
          </div>
          <div className={styles.couestionsContener}>
            {allAnswears.map((q) => (
              <ContainerCard
                title={q.value}
                image={q.url}
                foto={q.type === "mixed" ? true : false}
              />
            ))}
          </div>
          <div className={styles.btnContainer}>
            <button
              type="button"
              onClick={buttonHandler}
              className={styles.btn}
            >
              {!changeTitle ? "Sprawdź" : "Następne Pytanie"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCoustions;
