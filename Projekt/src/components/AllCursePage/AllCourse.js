import styles from "./AllCourse.module.css";
import CourseCard from "../UI/CourseCard";
import zdjeice from "../../image/banner.jpg";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SelectedCourseActions } from "../../storage/redux-index";
import { positionActions } from "../../storage/redux-index";
import { useNavigate } from "react-router-dom";

const AllCourse = (props) => {
  const history = useNavigate();
  const rememeberCheckbox = useRef();
  const [course, setCourse] = useState([]);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState();
  const dispatch = useDispatch();
  // ten useEffect pod spodem jest od Wiktora żeby sidebar dobrze działał. Najlepiej nie ruszać XD
  useEffect(() => {
    dispatch(positionActions.pagePositionChange(0));
  }, [dispatch]);

  const sendQuestion = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/get-all-courses");
      const parseJSON = await res.json();
      const loadedCurse = [];
      for (const key in parseJSON) {
        loadedCurse.push({
          id: key,
          name: parseJSON[key].name,
          _id: parseJSON[key]._id,
          school: parseJSON[key].school.name,
        });
      }
      setCourse(loadedCurse);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const ChangeCurseHandler = () => {
    if (rememeberCheckbox.current.checked) {
      const now = new Date();
      let time = now.getTime();
      time += 3600 * 1000 * 24 * 365 * 1;
      now.setTime(time);
      document.cookie = `courseId=${selectedCourseIndex}; expires=${now.toUTCString()}`;
    }
    dispatch(
      SelectedCourseActions.setId({
        id: selectedCourseIndex,
        cb: () => {
          history(props.page);
        },
      })
    );
  };

  const selectAnswearHandler = (index) => {
    setSelectedCourseIndex((indexID) => {
      if (index === indexID) {
        return undefined;
      } else {
        return index;
      }
    });
  };

  const courseList = course.map((course) => (
    <CourseCard
      key={course._id}
      index={course._id}
      logo={zdjeice}
      title={course.name}
      nameschool={course.school}
      id={course._id}
      funkcja={selectAnswearHandler}
      obecnyIndex={selectedCourseIndex}
    />
  ));

  useEffect(() => {
    dispatch(
      SelectedCourseActions.fetchCourseFromCookies({
        success: () => {
          history(props.page);
        },
        failure: () => {
          sendQuestion();
        },
      })
    );
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.main_conatinerCard}>{courseList}</div>
      <div className={styles.main_remeberCurse}>
        <div className={styles.remeberCurse}>
          <p className={styles.remeber_p}>Zapamiętaj kurs</p>
          <input
            className={styles.input_checkBox}
            type="checkbox"
            ref={rememeberCheckbox}
          />
        </div>
        <div className={styles.remeberCurseBtn} onClick={ChangeCurseHandler}>
          <p>Wybierz</p>
        </div>
      </div>
    </div>
  );
};

export default AllCourse;
