import style from "../AddQuestionComponents/QuestionForm.module.css";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import NewAnswerButton from "../AddQuestionComponents/NewAnswerButton";
import SingleAnswer from "../AddQuestionComponents/SingleAnswer";

export default function ModifyQuestionForm(props) {
  const [trueQuestionsAmount, setTrueQuestionsAmount] = useState(1);
  const [falseQuestionsAmount, setFlaseQuestionsAmount] = useState(1);
  const [hasDataBeenFetched,setHasDataBeenFetched]=useState(false);

  const correctAnswers = useMemo(() => {return [];}, []);
  const wrongAnswers = useMemo(() => {return [];}, []);
  const imagesArray = useMemo(() => {return [];}, []);
  const questionObject = useMemo(() => {return [];}, []);

  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const uid = logindata.uid;
  const token = logindata.token;

  const { courseId, questionId, setHttpError, setIsSpinnerActive, setPosition,setQuestionId } = props;

  function addAnotherAnswerHandler(event) {
      if (event.currentTarget.id === "true") {
        correctAnswers.push({type:"",value:""});
        setTrueQuestionsAmount(correctAnswers.length);
      } else {
        wrongAnswers.push({type:"",value:""});
        setFlaseQuestionsAmount(wrongAnswers.length);
      }
  }

  const getSingleQuestion = useCallback(async () => {
    try {
      setIsSpinnerActive(true);
      const response = await fetch("http://localhost:8080/get-one", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          token: token,
        },
        body: JSON.stringify({ courseId: courseId, questionId: questionId }),
      });
      if (!response.ok) {
        console.log(response.status, "status");
        if(!(response.status===404))
        {
          throw new Error("Nieoczekiwany błąd serwera");
        }
      }
      const data = await response.json();
      questionObject.push(data.question.question);
      correctAnswers.push(...data.question.correctAnswears);
      wrongAnswers.push(...data.question.falseAnswears);
      setTrueQuestionsAmount(correctAnswers.length);
      setFlaseQuestionsAmount(wrongAnswers.length);
      setIsSpinnerActive(false);
      setHasDataBeenFetched(true);
      console.log(
        data,
        questionObject,
        correctAnswers,
        wrongAnswers,
        data.question.type);
    } catch (error) {
      setHttpError(error.message);
      setIsSpinnerActive(false);
    }
  }, [setHttpError, setIsSpinnerActive, courseId, questionId,uid,token,questionObject,correctAnswers,wrongAnswers, setFlaseQuestionsAmount, setTrueQuestionsAmount]);

  function questionSubmitHandler()
  {
    props.setHttpError("");
    let isCorrectFlag=true;
    const formData= new FormData();
    formData.append("courseId",`${courseId}`);
    formData.append("_id",questionId)
    if(questionObject[0].value.trim()==="")
    {
      props.setHttpError("Proszę dodać treść pytania.");
      isCorrectFlag=false;
      return;
    }
    formData.append("question",JSON.stringify(questionObject[0]));
    console.log(formData.getAll("question"));
    correctAnswers.forEach((item)=>{
      console.log(item);
      if(item.value.trim()==="" && !item.imageName)
      {
          props.setHttpError("Prosze uzupełnić odpowiedzi.");
          isCorrectFlag=false;
      }
    });
    wrongAnswers.forEach((item)=>{
      console.log(item);
      if(item.value.trim()==="" && !item.imageName)
      {
          props.setHttpError("Prosze uzupełnić odpowiedzi.");
          isCorrectFlag=false;
      }
    });
      formData.append("correctAnswears",JSON.stringify(correctAnswers));
      formData.append("falseAnswears",JSON.stringify(wrongAnswers));
      if(imagesArray.length>0)
      {
        imagesArray.forEach((item)=>{
          formData.append("images",item);
        });
      }
      let mainType;
      correctAnswers.length>1 ? mainType="multiple" : mainType="single";
      formData.append("questionType",mainType);
      for( const [key,value] of formData)
      {
        console.log(key,value);
      }
      console.log(formData.getAll("images"));
      if(isCorrectFlag)
      {
        fetch("http://localhost:8080/modify-question",{
        method:"POST",
        headers:{
          "uid": uid,
          "token": token},
        body: formData
        }).then((response)=>{
          if(!response.ok)
          {
            console.log(response.status);
            throw new Error("Nieoczekiwany błąd serwera.");
          }
          return response.json();
        }).then((data)=>{
          console.log(data);
          props.setHttpSuccess("Pomyślnie zmodyfikowano pytanie");
        }).catch((error)=>{
          setHttpError(error.message);
        });
     }
  }

  function hideForm()
  {
    setPosition("questions");
    setHasDataBeenFetched(false);
    correctAnswers.splice(0,correctAnswers.length);
    wrongAnswers.splice(0,wrongAnswers.length);
    questionObject.splice(0,questionObject.length);
    imagesArray.splice(0,imagesArray.length);
    setQuestionId(null);
  }

  const trueAnswerElementArray = [];
  const falseAnswerElementArray = [];

   for (let i = 0; i < trueQuestionsAmount; i++) {
      trueAnswerElementArray.push(
    <SingleAnswer key={`${i}`} id={i} isModify={true} setAnswersAmount={setTrueQuestionsAmount} answersAmount={trueQuestionsAmount} answerObjects={correctAnswers} imagesArray={imagesArray} currentCourse={courseId} currentQuestion={questionId} hasDataBeenFetched={hasDataBeenFetched} uniqueClass={"correct"} />
  );
  }

  for (let i = 0; i < falseQuestionsAmount; i++) {
      falseAnswerElementArray.push(
    <SingleAnswer key={`${i}`} id={i} isModify={true} setAnswersAmount={setFlaseQuestionsAmount} answersAmount={falseQuestionsAmount}  answerObjects={wrongAnswers} imagesArray={imagesArray} currentCourse={courseId} currentQuestion={questionId} hasDataBeenFetched={hasDataBeenFetched} uniqueClass={"wrong"} />
  );
  }

  useEffect(() => {
    if (questionId) {
      getSingleQuestion();
    }
  }, [questionId,getSingleQuestion]);

  return (
    <div className={`${style.modifyQuestionDataContainer} ${!(props.position === "form") ? `${style.hidden}` : ""}`}>
      <button type="button" onClick={hideForm} className={style.returnButton}>
        Powrót
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="2rem"
          viewBox="0 0 24 24"
          width="2rem"
          fill="white">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>
      </button>
      <div className={style.inputsContainer}>
          <h4>Dodaj treść pytania</h4>
          <SingleAnswer id={0} isModify={true} answerObjects={questionObject} hasDataBeenFetched={hasDataBeenFetched} imagesArray={imagesArray} currentCourse={courseId} currentQuestion={questionId} uniqueClass={"question"}/>
        </div>
      <div className={style.inputsContainer}>
        <h4>Poprawne odpowiedzi</h4>
        {trueAnswerElementArray}
        <NewAnswerButton id="true" addAnotherAnswerHandler={addAnotherAnswerHandler}/>
      </div>
      <div className={style.inputsContainer}>
        <h4>Błędne odpowiedzi</h4>
      {falseAnswerElementArray}
      <NewAnswerButton id="false" addAnotherAnswerHandler={addAnotherAnswerHandler}/>
      </div>
      <button type="button" onClick={questionSubmitHandler} className={style.submitButton}>Potwierdź</button>
    </div>
  );
}
