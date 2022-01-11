import styles from "./SingleCoustions.module.css";
import ContainerCard from "../components/UI/ContainerCard";
import TitleContainerCard from "../components/UI/TitleContainerCard";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SingleCoustions = () => {
  const history = useNavigate();
  const [changeTitle, setChangeTitle] = useState(false);
  const [indexesArray, setIndexesArray] = useState([]);
  const [questionsTable, setQuestionsTable] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allAnswears, setAllAnswears] = useState([]);
  const [correctAnswears, setCorrectAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const courseId = useSelector((state) => state.autoCurseId);
  const auth = useSelector((state) => state.autoIndentification);

  const sellectAnwearHandler = (index) =>{
    setIndexesArray(p=>{
      const TMP = p.findIndex(q=>+q===+index);
      let TMPArray = [];
      if(TMP>=0){
        TMPArray=p.filter(k=>+k!==+index);
      }else{
        TMPArray=[...p, index];
      }
      return TMPArray;
    });
  }

  const buttonHandler = () => {
    setChangeTitle((prev) => !prev);
    for(const key of allAnswears){
      console.log(key);
    }
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
        if (
          key_of_Cookies === "idCurse"
        ) {
          Saved_Cookie_Object[key_of_Cookies] = key[key_of_Cookies];
          console.log(Saved_Cookie_Object[key_of_Cookies], 'cookiesv1');
        }
      }
    }
    return Saved_Cookie_Object;
  }, []);

  const shuffleQuestions = () =>{
    
  };

  const sendQuestions = useCallback(async (cookies) => {
    const TMP = [];
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
    console.log(parsedResponse);
    if (res.status === 404 || res.status===500) {
      return history(`/questions`);
    }
    console.log(cookies.idCurse, 'cokkies');
    parsedResponse.forEach((q) => TMP.push(q));
    const shuffledArray = TMP.sort((a, b) => 0.5 - Math.random());
    setQuestionsTable(shuffledArray);

    let ANS_TMP = [];

    shuffledArray[currentIndex].correctAnswears.forEach((a) => {
      a.isCorrect = true;  
      ANS_TMP.push(a);     
    });     

    shuffledArray[currentIndex].falseAnswears.forEach((a) => {       
      a.isCorrect = false;       
      ANS_TMP.push(a);     
    });
    ANS_TMP = ANS_TMP.sort((a, b) => 0.5 - Math.random());

    setAllAnswears(ANS_TMP);
    setLoading(false);



  }, [auth.uid, auth.token, auth.remeberMe, courseId, history, currentIndex]);

  useEffect(() => {
    const cookies = getCookies();
    sendQuestions(cookies);
  }, [sendQuestions, getCookies]);

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
              key={questionsTable[currentIndex]._id}
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
            {allAnswears.map((q, index) => (
              <ContainerCard
                key={index}
                index={index}
                title={q.value}
                image={q.url}
                foto={q.type === "mixed" ? true : false}
                sellectHandler={sellectAnwearHandler}
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
