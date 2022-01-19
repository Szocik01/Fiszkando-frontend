import style from "./CoursesContainer.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import SingleCard from "./SingleCard";
import { useEffect, useCallback, useState, Fragment } from "react";
import { Link } from "react-router-dom";

export default function CoursesContainer(props) {
  const [coursesList, setCoursesList] = useState([]);

  const {
    setIsCourses,
    setHttpError,
    setIsSpinnerActive,
    isSpinnerActive,
    isCourses,
    setCourse,
    university,
    basketData,
  } = props;

  const getCourses = useCallback(async () => {
    try {
      setIsSpinnerActive(true);
      const response = await fetch("http://localhost:8080/get-all-courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ schoolId: university }),
      });
      if (!response.ok) {
        throw new Error("Nieoczekiwany błąd serwera");
      }
      const data = await response.json();
      console.log(data);
      setCoursesList(
        data.map((item) => {
          return (
            <SingleCard
              isCourses={true}
              setCourse={setCourse}
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              universityName={item.school.name}
            />
          );
        })
      );
      setIsSpinnerActive(false);
    } catch (error) {
      setHttpError(error.message);
      setIsSpinnerActive(false);
    }
  }, [setHttpError, setIsSpinnerActive, university]);

  function hideForm() {
    setIsCourses(false);
  }

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <div className={`${style.coursesContainer} ${isCourses && style.visible}`}>
      {isSpinnerActive && <LoadingSpinner />}
      {!isSpinnerActive && (
        <Fragment>
          <div className={style.buttonContainer}>
            <Link to="/buy_course" className={style.basket} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="white"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8L14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              Koszyk
              <div className={style.itemsCount}>{basketData.items.length}</div>
            </Link>
            <button
              type="button"
              onClick={hideForm}
              className={style.returnButton}
            >
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
          </div>
          {coursesList}
        </Fragment>
      )}
    </div>
  );
}
