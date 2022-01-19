import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./DataSelection.module.css";
import SearchBar from "../CoursesManager/SearchBar";
import NotFound from "../../UI/NotFound";
import ListItem from "./ListItem";
import { Link } from "react-router-dom";

export default function QuestionForm(props) {
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [initialQuestions, setInitialQuestions] = useState([]);

  const { setHttpError, setIsSpinnerActive, courseId, setHttpSuccess } = props;

  const logindata = useSelector((state) => {return state.autoIndentification;});
  const uid = logindata.uid;
  const token = logindata.token;

  function hideForm()
  {
    props.setPosition("courses");
  }

  const getQuestions = useCallback(async () => {
    try {
      console.log(JSON.stringify(courseId))
      setIsSpinnerActive(true);
      const response = await fetch("http://localhost:8080/get-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          token: token,
        },
        body: JSON.stringify({courseId:courseId}),
      });
      if (!response.ok) {
        console.log(response.status, "status");
        throw new Error("Nieoczekiwany błąd serwera");
      }
      const data = await response.json();
      setInitialQuestions(data);
      setCurrentQuestions(data);
      setIsSpinnerActive(false);
      console.log(data);
    } catch (error) {
      setHttpError(error.message);
      setIsSpinnerActive(false);
    }
  }, [setHttpError, setIsSpinnerActive,courseId,uid,token]);

  function filter(array) {
    console.log(array);
    setCurrentQuestions(array);
  }

  useEffect(() => {
      if(courseId)
      {
        getQuestions();     
      }
    console.log(courseId)
  }, [getQuestions,courseId]);

  return (
    <div
      className={`${style.questionsSiteContainer} ${props.position==="courses" && style.left} ${props.position==="questions" && style.center} ${props.position==="form" && style.right}`}>
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
      <SearchBar
        filter={filter}
        courses={currentQuestions}
        initialCourses={initialQuestions}/>
      <div className={style.wraper}>
        {currentQuestions.length > 0 && (
          <ul className={style.listContainer}>
            {currentQuestions.map((element) => {
              return (
                <ListItem
                  key={element._id}
                  name={element.question.value}
                  author={element.author}
                  id={element._id}
                  courseId={courseId}
                  position={props.position}
                  isQuestion={true}
                  setHttpError={setHttpError}
                  setHttpSuccess={setHttpSuccess}
                  setIsSpinnerActive={setIsSpinnerActive}
                  setPosition={props.setPosition}
                  setQuestionId={props.setQuestionId}
                />
              );
            })}
          </ul>
        )}
        {currentQuestions.length === 0 && (
          <NotFound>Nie znaleziono żadnych pytań.</NotFound>
        )}
        <Link to={`/settings/add_question?courseId=${courseId}`} className={style.addButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="2rem"
            viewBox="0 0 24 24"
            width="2rem"
            fill="white">
            <g>
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <g />
              <g>
                <path d="M17,19.22H5V7h7V5H5C3.9,5,3,5.9,3,7v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-7h-2V19.22z" />
                <path d="M19,2h-2v3h-3c0.01,0.01,0,2,0,2h3v2.99c0.01,0.01,2,0,2,0V7h3V5h-3V2z" />
                <rect height="2" width="8" x="7" y="9" />
                <polygon points="7,12 7,14 15,14 15,12 12,12" />
                <rect height="2" width="8" x="7" y="15" />
              </g>
            </g>
          </svg>
        </Link>
      </div>
    </div>
  );
}
