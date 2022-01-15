import style from "./BuyCourse.module.css";
import CoursesContainer from "../components/buyCourseComponents/CoursesContainer";
import UniversitiesContainer from "../components/buyCourseComponents/UniversitiesContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { positionActions } from "../storage/redux-index";

export default function BuyCourse() {
  const [isCourses, setIsCourses] = useState(false);
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [httpError, setHttpError] = useState("");
  const [isSpinnerActive, setIsSpinnerActive] = useState(false);

  const dispatch = useDispatch();

  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const uid = logindata.uid;
  const token = logindata.token;

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(3 * 3.4));
  }, [dispatch]);

  return (
    <div className={`${style.siteContainer} ${uid && token && style.logged}`}>
      <UniversitiesContainer
        setUniversity={setUniversity}
        setHttpError={setHttpError}
        setIsSpinnerActive={setIsSpinnerActive}
        setIsCourses={setIsCourses}
        isSpinnerActive={isSpinnerActive}
        isCourses={isCourses}
      />
      <CoursesContainer
        setIsCourses={setIsCourses}
        setHttpError={setHttpError}
        setIsSpinnerActive={setIsSpinnerActive}
        setCourse={setCourse}
        university={university}
        isSpinnerActive={isSpinnerActive}
        isCourses={isCourses}
      />
    </div>
  );
}
