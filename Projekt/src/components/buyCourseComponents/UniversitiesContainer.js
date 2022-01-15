import style from "./UniversitiesContainer.module.css";
import SingleCard from "./SingleCard";
import { useEffect, useCallback, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

export default function UniversitiesContainer(props) {
  const [universityList, setUniversityList] = useState([]);

  const { setHttpError, setUniversity, setIsSpinnerActive, isSpinnerActive, setIsCourses, isCourses } = props;

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
            <SingleCard
              key={item._id}
              id={item._id}
              name={item.name}
              isCourses={false}
              setUniversity={setUniversity}
              setIsCourses={setIsCourses}/>
          );
        })
      );
      setIsSpinnerActive(false);
    } catch (error) {
      setIsSpinnerActive(false);
      setHttpError(error.message);
    }
  }, [setHttpError, setIsSpinnerActive]);

  useEffect(() => {
    getUniversities();
  }, [getUniversities]);

  return (
    <div className={`${style.universitiesContainer} ${isCourses && style.hidden}`}>
      {isSpinnerActive ? <LoadingSpinner /> : ""} 
      {universityList}
    </div>
  );
}
