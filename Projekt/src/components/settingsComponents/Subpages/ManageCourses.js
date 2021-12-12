import { useState } from "react";

import MainPage from "../CoursesManager/MainPage";
import AddCourse from "../CoursesManager/AddCourse";

import styles from "./ManageCourses.module.css";

const ManageCourses = (props) => {
  const [movedMainPage, setMovedMainPage] = useState(false);

  const movePage = () => setMovedMainPage((l) => !l);

  return (
    <div className={styles.container}>
      <MainPage isMoved={movedMainPage} moveHandler={movePage} />
      <AddCourse isMoved={movedMainPage} moveHandler={movePage} />
    </div>
  );
};

export default ManageCourses;
