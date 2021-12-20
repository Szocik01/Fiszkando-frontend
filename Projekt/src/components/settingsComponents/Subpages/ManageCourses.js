import { useState, useEffect } from "react";

import MainPage from "../CoursesManager/MainPage";
import AddCourse from "../CoursesManager/AddCourse";
import ModifyCourse from "../CoursesManager/ModifyCourse";

import styles from "./ManageCourses.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Error from "../../UI/Error";

const ManageCourses = (props) => {
  const [initialCourses, setInitialCourses] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [schools, setSchools] = useState([]);

  const [movedMainPage, setMovedMainPage] = useState(false);
  const [moveMainPageToLeft, setMoveMainPageToLeft] = useState(false);

  const [modifyCourseData, setModifyCourseData] = useState({
    _id: "",
    name: "",
    price: "",
    school: { _id: "", name: "" },
  });

  const [isSpinner, setIsSpinner] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAllCourses = async () => {
    const COURSES = [];
    try {
      setIsSpinner(true);
      const coursesNotParsed = await fetch(
        "http://localhost:8080/get-all-courses"
      );
      const parsedCourses = await coursesNotParsed.json();
      parsedCourses.forEach((c) => {
        COURSES.push(c);
      });
      console.log(COURSES);
      setCoursesList(COURSES);
      setInitialCourses(COURSES);
      setIsSpinner(false);
      setIsError(false);
    } catch (err) {
      setIsSpinner(false);
      setIsError(true);
      console.log(err);
    }
  };

  const getSchools = async () => {
    const SCHOOLS = [];
    try {
      setIsSpinner(true);
      const res = await fetch("http://localhost:8080/get-all-schools");
      const parsed = await res.json();
      parsed.forEach((s) => SCHOOLS.push(s));
      setSchools(SCHOOLS);
      setIsSpinner(false);
      setIsError(false);
    } catch (err) {
      setIsSpinner(false);
      setIsError(true);
      console.log(err);
    }
  };

  const saveFilter = (arr) => {
    console.log(arr);
    setCoursesList(arr);
  };

  const refreshHandler = (course) => {
    const arr = initialCourses;
    arr.push(course);
    setInitialCourses(arr);
    setCoursesList(arr);
  };

  const filterHandler = (id) => {
    const arr = initialCourses.filter((c) => c._id.toString() !== id);
    setInitialCourses(arr);
    setCoursesList(arr);
  };

  useEffect(() => {
    fetchAllCourses();
    getSchools();
  }, []);

  const movePage = () => setMovedMainPage((l) => !l);
  const moveToLeft = () => setMoveMainPageToLeft((l) => !l);
  const saveHandler = (obj) => setModifyCourseData(obj);
  const updateHandler = (obj) => {
    console.log(obj);
    const arr = initialCourses;
    const index = arr.findIndex((c) => c._id.toString() === obj._id.toString());
    arr[index] = obj;
    setInitialCourses(arr);
    setCoursesList(arr);
  };
  return (
    <>
      {isSpinner && <LoadingSpinner />}
      {!isSpinner && isError && <Error />}
      {!isSpinner && !isError && (
        <div className={styles.container}>
          <MainPage
            isMoved={movedMainPage}
            moveHandler={movePage}
            leftMoveHandler={moveToLeft}
            isMovedToLeft={moveMainPageToLeft}
            saveHandler={saveHandler}
            courses={coursesList}
            filter={saveFilter}
            initialCourses={initialCourses}
            filterHandler={filterHandler}
          />
          <AddCourse
            isMoved={movedMainPage}
            moveHandler={movePage}
            schools={schools}
            refresh={refreshHandler}
          />
          <ModifyCourse
            isMoved={moveMainPageToLeft}
            moveHandler={moveToLeft}
            data={modifyCourseData}
            schools={schools}
            updateHandler={updateHandler}
          />
        </div>
      )}
    </>
  );
};

export default ManageCourses;
