import styles from "./SingleQuestions.module.css";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Question from "./Querstions";

const SingleQuestions = () => {
  const history = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const courseId = useSelector((state) => state.autoCurseId);
  const auth = useSelector((state) => state.autoIndentification);

  const switchQuestion = () => {
    let newInd = currentIndex;
    if (allQuestions[currentIndex + 1]) {
      setCurrentQuestion(allQuestions[currentIndex + 1]);
      newInd++;
    } else {
      setCurrentQuestion(allQuestions[0]);
      newInd = 0;
    }
    setCurrentIndex(newInd);
  };

  const getCookies = useCallback(() => {
    const Array_of_Cookies = document.cookie.split(";");
    const Final_Cookie_Array = [];
    const Saved_Cookie_Object = {};
    for (const key of Array_of_Cookies) {
      const obj = {};
      const Half_Array_Cookies = key.split("=");
      obj[Half_Array_Cookies[0].trim()] = Half_Array_Cookies[1];
      Final_Cookie_Array.push(obj);
    }
    for (const key of Final_Cookie_Array) {
      for (const key_of_Cookies in key) {
        // console.log(key_of_Cookies);
        if (key_of_Cookies === "idCurse") {
          Saved_Cookie_Object[key_of_Cookies] = key[key_of_Cookies];
          // console.log(Saved_Cookie_Object[key_of_Cookies], "cookiesv1");
        }
      }
    }
    return Saved_Cookie_Object;
  }, []);

  const sendQuestions = useCallback(
    async (cookies) => {
      const res = await fetch("http://localhost:8080/get-all", {
        method: "POST",
        body: JSON.stringify({
          courseId: courseId.id || cookies.idCurse,
        }),
        headers: {
          uid: auth.uid,
          token: auth.token,
          remeberMe: auth.remeberMe,
          "Content-Type": "application/json",
        },
      });
      const parsedResponse = await res.json();
      if (res.status === 404 || res.status === 500) {
        return history(`/questions`);
      }
      parsedResponse.forEach((q) => {
        let allAnswears = [];
        q.correctAnswears.forEach((a) => {
          a.isCorrect = true;
          allAnswears.push(a);
        });
        q.falseAnswears.forEach((a) => {
          a.isCorrect = false;
          allAnswears.push(a);
        });
        allAnswears = allAnswears.sort((a, b) => 0.5 - Math.random());
        allAnswears.forEach((a, index) => (a.index = index));
        q.allAnswears = allAnswears;
      });
      const shuffledArray = parsedResponse.sort((a, b) => 0.5 - Math.random());
      setAllQuestions(shuffledArray);
      setCurrentQuestion(shuffledArray[0]);

      setLoading(false);
    },
    [auth, courseId, history]
  );

  useEffect(() => {
    const cookies = getCookies();
    sendQuestions(cookies);
  }, [sendQuestions, getCookies]);

  return (
    <div className={styles.container}>
      {!loading && (
        <Question
          currentQuestion={currentQuestion}
          switchQuestion={switchQuestion}
        />
      )}
    </div>
  );
};

export default SingleQuestions;