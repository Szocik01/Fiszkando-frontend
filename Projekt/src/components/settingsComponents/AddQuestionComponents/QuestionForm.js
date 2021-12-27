import style from "./QuestionForm.module.css";
import SingleAnswer from "./SingleAnswer";
import NewAnswerButton from "./NewAnswerButton";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function QuestionForm(props) {
  const [shouldReset, setShouldReset] = useState(false);

  const correctAnswers = useMemo(() => {
    return [];
  }, []);
  const wrongAnswers = useMemo(() => {
    return [];
  }, []);
  const imagesArray = useMemo(() => {
    return [];
  }, []);
  const questionObject = useMemo(() => {
    return [];
  }, []);

  const { setTrueQuestionsAmount, setFlaseQuestionsAmount, course } = props;

  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const uid = logindata.uid;
  const token = logindata.token;

  function addAnotherAnswerHandler(event) {
    if (event.currentTarget.id === "true") {
      props.setTrueQuestionsAmount((prevValue) => {
        return prevValue + 1;
      });
    } else {
      props.setFlaseQuestionsAmount((prevValue) => {
        return prevValue + 1;
      });
    }
  }

  function hideForm() {
    props.setIsQuestionVisible(false);
  }

  function questionSubmitHandler() {
    props.setHttpError("");
    let isCorrectFlag = true;
    const formData = new FormData();
    let mainType = "text";
    if (!course) {
      props.setHttpError("Aby dodać pytanie najwierw należy wybrać kurs.");
      isCorrectFlag = false;
      return;
    }
    formData.append("courseId", `${course}`);
    if (questionObject[0].value.trim() === "") {
      props.setHttpError("Proszę dodać treść pytania.");
      isCorrectFlag = false;
      return;
    }
    formData.append("question", JSON.stringify(questionObject[0]));
    console.log(formData.getAll("question"));
    correctAnswers.forEach((item) => {
      console.log(item);
      if (item.value.trim() === "" && !item.imageName) {
        props.setHttpError("Prosze uzupełnić odpowiedzi.");
        isCorrectFlag = false;
      }
    });
    wrongAnswers.forEach((item) => {
      console.log(item);
      if (item.value.trim() === "" && !item.imageName) {
        props.setHttpError("Prosze uzupełnić odpowiedzi.");
        isCorrectFlag = false;
      }
    });
    formData.append("correctAnswears", JSON.stringify(correctAnswers));
    formData.append("falseAnswears", JSON.stringify(wrongAnswers));
    if (imagesArray.length > 0) {
      mainType = "mixed";
      imagesArray.forEach((item) => {
        formData.append("images", item);
      });
    }
    formData.append("questionType", mainType);
    for (const [key, value] of formData) {
      console.log(key, value);
    }
    console.log(formData.getAll("images"));
    if (isCorrectFlag) {
      fetch("http://localhost:8080/add-question", {
        method: "POST",
        headers: {
          uid: uid,
          token: token,
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            console.log(response.status);
            throw new Error("Nieoczekiwany błąd serwera.");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          props.setSuccessMessage("Pomyślnie dodano pytanie");
          setShouldReset(true);
        })
        .catch((error) => {
          props.setHttpError(error.message);
        });
    }
  }

  const trueAnswerElementArray = [];
  const falseAnswerElementArray = [];

  for (let i = 0; i < props.trueQuestionsAmount; i++) {
    trueAnswerElementArray.push(
      <SingleAnswer
        key={`${i}`}
        id={i}
        shouldReset={shouldReset}
        setShouldReset={setShouldReset}
        answerObjects={correctAnswers}
        imagesArray={imagesArray}
        currentCourse={props.course}
        uniqueClass={"correct"}
      />
    );
  }

  for (let i = 0; i < props.falseQuestionsAmount; i++) {
    falseAnswerElementArray.push(
      <SingleAnswer
        key={`${i}`}
        id={i}
        shouldReset={shouldReset}
        setShouldReset={setShouldReset}
        answerObjects={wrongAnswers}
        imagesArray={imagesArray}
        currentCourse={props.course}
        uniqueClass={"wrong"}
      />
    );
  }

  const removeArraysData = useCallback(() => {
    correctAnswers.splice(0, correctAnswers.length);
    correctAnswers.push({ type: "", value: "" });
    wrongAnswers.splice(0, wrongAnswers.length);
    wrongAnswers.push({ type: "", value: "" });
    questionObject.splice(0, questionObject.length);
    questionObject.push({ type: "", value: "" });
    imagesArray.splice(0, imagesArray.length);
    setTrueQuestionsAmount(1);
    setFlaseQuestionsAmount(1);
  }, [
    correctAnswers,
    wrongAnswers,
    questionObject,
    imagesArray,
    setTrueQuestionsAmount,
    setFlaseQuestionsAmount,
  ]);

  useEffect(() => {
    removeArraysData();
    console.log(correctAnswers, wrongAnswers, imagesArray);
  }, [course, removeArraysData]);

  useEffect(() => {
    if (shouldReset) {
      removeArraysData();
    }
  }, [shouldReset, removeArraysData]);

  return (
    <div
      className={`${style.questionDataContainer} ${
        props.isQuestionVisible ? `${style.visible}` : ""
      }`}
    >
      <button type="button" onClick={hideForm} className={style.returnButton}>
        Powrót
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="2rem"
          viewBox="0 0 24 24"
          width="2rem"
          fill="white"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>
      </button>
      <div className={style.inputsContainer}>
        <h4>Dodaj treść pytania</h4>
        <SingleAnswer
          id={0}
          shouldReset={shouldReset}
          setShouldReset={setShouldReset}
          answerObjects={questionObject}
          imagesArray={imagesArray}
          currentCourse={props.course}
          uniqueClass={"question"}
        />
      </div>
      <div className={style.inputsContainer}>
        <h4>Poprawne odpowiedzi</h4>
        {trueAnswerElementArray}
        <NewAnswerButton
          id="true"
          addAnotherAnswerHandler={addAnotherAnswerHandler}
        />
      </div>
      <div className={style.inputsContainer}>
        <h4>Błędne odpowiedzi</h4>
        {falseAnswerElementArray}
        <NewAnswerButton
          id="false"
          addAnotherAnswerHandler={addAnotherAnswerHandler}
        />
      </div>
      <button
        type="button"
        onClick={questionSubmitHandler}
        className={style.submitButton}
      >
        Potwierdź
      </button>
    </div>
  );
}
