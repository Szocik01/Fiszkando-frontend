import SelectInputs from "../AddQuestionComponents/SelectInputs";
import QuestionForm from "../AddQuestionComponents/QuestionForm";
import { informationBoxManagerActions } from "../../../storage/information-box";
import { useDispatch } from "react-redux";
import style from "./AddQuestion.module.css";
import { Fragment, useEffect, useState} from "react";
import Spiner from "../../formComponents/Spinner";
import { useLocation } from "react-router-dom";

export default function AddQuestion() {
  const [isSpinnerActive, setIsSpinnerActive]=useState(false);
  const [httpError,setHttpError]=useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [trueQuestionsAmount, setTrueQuestionsAmount] = useState(1);
  const [falseQuestionsAmount, setFlaseQuestionsAmount] = useState(1);
  const [isQuestionVisible,setIsQuestionVisible]=useState(false);
  const [successMessage,setSuccessMessage]=useState("");

  const location=useLocation();

  const dispatch=useDispatch();

  useEffect(()=>{
    if(location.search)
    {
      const params= new URLSearchParams(location.search);
      setCourse(params.get("courseId"));
      setShowQuestionForm(true);
      setTimeout(() => {
        setIsQuestionVisible(true);
      }, 20);
    }
  },[location])

  useEffect(() => {
    if(location.search.trim() === "")
    {
      if (university.trim() === "" || course.trim() === "") {
        setShowQuestionForm(false);
      }
      else
      {
        setShowQuestionForm(true);
      }
    }
  }, [university, course, location]);

  useEffect(()=>{
    if(httpError)
    {
      dispatch(informationBoxManagerActions.setBox({message:httpError,isError:true}));
      dispatch(informationBoxManagerActions.toggleVisibility());
      setHttpError("");
    }
  },[httpError,dispatch]);

  useEffect(()=>{
    if(successMessage)
    {
      dispatch(informationBoxManagerActions.setBox({message:successMessage}));
      dispatch(informationBoxManagerActions.toggleVisibility());
      setSuccessMessage("");
    }
  },[successMessage, dispatch]);

  return (
    <Fragment>
      {isSpinnerActive && <Spiner>Loading...</Spiner>}
      <form className={style.formContainer}>
        <SelectInputs isQuestionVisible={isQuestionVisible} setIsQuestionVisible={setIsQuestionVisible} setHttpError={setHttpError} setIsSpinnerActive={setIsSpinnerActive} setUniversity={setUniversity} setCourse={setCourse} showQuestionForm={showQuestionForm} university={university}/>
        {showQuestionForm && <QuestionForm setSuccessMessage={setSuccessMessage} isQuestionVisible={isQuestionVisible} setIsQuestionVisible={setIsQuestionVisible} setTrueQuestionsAmount={setTrueQuestionsAmount} setFlaseQuestionsAmount={setFlaseQuestionsAmount} setHttpError={setHttpError} course={course} trueQuestionsAmount={trueQuestionsAmount} falseQuestionsAmount={falseQuestionsAmount}/>}
      </form>
    </Fragment>
  );
}