import style from "./CoursesContainer.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import SingleCard from "./SingleCard";
import { useEffect,useCallback, useState } from "react";

export default function CoursesContainer(props)
{
    
  const [coursesList,setCoursesList]=useState([]);

  const{setIsCourses,setHttpError,setIsSpinnerActive,isSpinnerActive,isCourses,setCourse,university}=props
  
  const getCourses = useCallback(async () => {
    try {
      setIsSpinnerActive(true);
      const response = await fetch("http://localhost:8080/get-all-courses",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ schoolId: university})
      });
      if (!response.ok) {
        throw new Error("Nieoczekiwany błąd serwera");
      }
      const data = await response.json();
      console.log(data);
      
      
      setIsSpinnerActive(false);
    } catch (error) {
      setHttpError(error.message);
      setIsSpinnerActive(false);
    }
  }, [setHttpError, setIsSpinnerActive,university]);
  
    function hideForm()
    {
      setIsCourses(false);        
    }

    useEffect(()=>{
      getCourses()
    },[getCourses]);
    

    return <div className={`${style.coursesContainer} ${isCourses && style.visible}`}>
        {isSpinnerActive && <LoadingSpinner/>}
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
    </div>
}