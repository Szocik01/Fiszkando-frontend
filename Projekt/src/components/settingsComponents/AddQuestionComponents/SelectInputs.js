import { useEffect, useState, useCallback } from "react";
import style from "./SelectInputs.module.css";

export default function SelectInputs (props) {

    const [universityList,setUniversityList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const {setHttpError, setIsSpinnerActive, university}=props;

  const getUniversities = useCallback(async () => {
    setHttpError("");
    setIsSpinnerActive(true);
    try {
      const response = await fetch("http://localhost:8080/get-all-schools");
      if (!response.ok) {
        throw new Error("Wystąpił błąd serwera. Proszę czekać.");
      }
      const data = await response.json();
      console.log(data);
      setUniversityList(
        data.map((item) => {
          return (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          );
        })
      );
      setIsSpinnerActive(false);
    } catch (error) {
      setIsSpinnerActive(false);
      setHttpError(error.message);
    }
  }, [setHttpError,setIsSpinnerActive]);

  const getCourses = useCallback(async () => {
    setHttpError("");
    setIsSpinnerActive(true);
    try {
      const response = await fetch("http://localhost:8080/get-all-courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ schoolId: university }),
      });
      if (!response.ok) {
        throw new Error("Wystąpił błąd serwera. Proszę czekać.");
      }
      const data = await response.json();
      setCourseList(
        data.map((item) => {
          return (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          );
        })
      );
      setIsSpinnerActive(false);
    } catch (error) {
      setIsSpinnerActive(false);
      setHttpError(error.message);
    }
  }, [setHttpError,setIsSpinnerActive,university]);

  function selectInputChangeHandler(event) {
    if (event.target.id === "university") {
      props.setUniversity(event.target.value);
      props.setCourse("");
    } else {
      props.setCourse(event.target.value);
    }
  }

  function showForm()
  {
    props.setIsQuestionVisible(true);
  }

  useEffect(() => {
    getUniversities();
  }, [getUniversities]);

  useEffect(() => {
    getCourses();
  }, [props.university, getCourses]);

  return (
    <div className={`${style.selectContainer} ${props.isQuestionVisible?`${style.hide}`:""}`}>
      <div className={style.singleContainer}>
      <label htmlFor="university">Wybierz uniwersytet</label>
      <select
        id="university"
        onChange={selectInputChangeHandler}
        defaultValue="">
        <option value="">-</option>
        {universityList}
      </select>
      </div>
      <div className={style.singleContainer}>
        <label htmlFor="course">Wybierz kurs</label>
      <select id="course" onChange={selectInputChangeHandler} defaultValue="">
        <option value="">-</option>
        {courseList}
      </select>
      </div>
      <button type="button" disabled={props.showQuestionForm?false:true} className={`${props.showQuestionForm ? style.confirmButton:""} ${style.confirmStaticClass}`} onClick={showForm}>Potwierdź</button>
    </div>
  );
}