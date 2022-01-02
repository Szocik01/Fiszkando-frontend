import { Fragment, useState, useEffect } from "react";
import CourseSelection from "../ModifyQuestionComponents/CourseSelection";
import ModifyQuestionForm from "../ModifyQuestionComponents/ModifyQuestionForm";
import QuestionSelection from "../ModifyQuestionComponents/QuestionSelection";
import Spiner from "../../formComponents/Spinner";
import { informationBoxManagerActions } from "../../../storage/information-box";
import { useDispatch } from "react-redux";
import style from "./AddQuestion.module.css";

export default function ModifyQuestion() {
  const [position, setPosition] = useState("courses");
  const [courseId, setCourseId] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [isSpinnerActive, setIsSpinnerActive] = useState(false);
  const [httpError, setHttpError] = useState("");
  const [httpSuccess, setHttpSuccess] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (httpError) {
      dispatch(
        informationBoxManagerActions.setBox({
          message: httpError,
          isError: true})
      );
      dispatch(informationBoxManagerActions.toggleVisibility());
      setHttpError("");
    }
  }, [httpError, dispatch]);

  useEffect(() => {
    if (httpSuccess) {
      dispatch(informationBoxManagerActions.setBox({ message: httpSuccess }));
      dispatch(informationBoxManagerActions.toggleVisibility());
      setHttpSuccess("");
    }
  }, [httpSuccess, dispatch]);

  return (
    <Fragment>
      {isSpinnerActive && <Spiner>Loading...</Spiner>}
      <form className={style.formContainer}>
        <QuestionSelection
          position={position}
          setPosition={setPosition}
          setHttpError={setHttpError}
          setHttpSuccess={setHttpSuccess}
          courseId={courseId}
          setQuestionId={setQuestionId}
          setIsSpinnerActive={setIsSpinnerActive}
        />
        <ModifyQuestionForm
          position={position}
          setPosition={setPosition}
          setHttpSuccess={setHttpSuccess}
          setHttpError={setHttpError}
          courseId={courseId}
          questionId={questionId}
          setQuestionId={setQuestionId}
          setIsSpinnerActive={setIsSpinnerActive}
        />
        <CourseSelection
          position={position}
          setPosition={setPosition}
          setHttpError={setHttpError}
          setCourseId={setCourseId}
          setIsSpinnerActive={setIsSpinnerActive}
        />
      </form>
    </Fragment>
  );
}
