import style from "./ListItem.module.css";
import { useSelector } from "react-redux";

export default function ListItem(props) {

  const logindata = useSelector((state) => {return state.autoIndentification;});
  const uid = logindata.uid;
  const token = logindata.token;

  function listItemClickHandler() {
    if(props.setCourseId)
    {
      props.setPosition("questions");
      props.setCourseId(props.id);
    }
    else if(props.setQuestionId)
    {
      props.setPosition("form");
      props.setQuestionId(props.id);
    }
  }

  const deleteQuestion= async (event)=>{
    event.stopPropagation();
    if(props.setQuestionId)
    {
      try
      {
        props.setIsSpinnerActive(true);
        const response= await fetch("http://localhost:8080/remove-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          token: token,
        },
        body: JSON.stringify({courseId:props.courseId,questionId:props.id})});
        if(!response.ok)
        {
          props.setIsSpinnerActive(false);
          throw new Error("Nieoczekiwany błąd serwera.");
        }
        props.setIsSpinnerActive(false);
        event.target.closest("li").remove();
        props.setHttpSuccess("Pomyślnie usunięto pytanie");
      }
      catch(error)
      {
        props.setHttpError(error.message);
      }
      
    }
  }

  return (
    <li className={style.item} onClick={listItemClickHandler}>
      <div className={`${style.title} ${props.isQuestion ? style.question : ""}`}>{props.name ? props.name : ""}</div>
      <div className={`${style.price} ${props.isQuestion ? style.question : ""}`}>{props.price ? `${props.price} PLN` : props.author ? props.author : ""}</div>
      {props.school ? <div className={style.schoolName}>{props.school.name}</div> : ""}
      {props.isQuestion ? <div className={style.actions}>
        <button className={style.deleteBtn} type="button" onClick={deleteQuestion}>
          Usuń{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="white"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button></div> :""}
    </li>
  );
}
