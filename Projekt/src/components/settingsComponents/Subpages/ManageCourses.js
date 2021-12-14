import { useState } from "react";

import MainPage from "../CoursesManager/MainPage";
import AddCourse from "../CoursesManager/AddCourse";
import ModifyCourse from "../CoursesManager/ModifyCourse";

import styles from "./ManageCourses.module.css";

const ManageCourses = (props) => {
  const [movedMainPage, setMovedMainPage] = useState(false);
  const [moveMainPageToLeft, setMoveMainPageToLeft] = useState(false);
  const [modifyCourseData, setModifyCourseData] = useState({
    _id: "",
    name: "",
    price: "",
    school: { _id: "", name: "" },
  });

  const movePage = () => setMovedMainPage((l) => !l);
  const moveToLeft = () => setMoveMainPageToLeft((l) => !l);
  const saveHandler = (obj) => setModifyCourseData(obj);

  return (
    <div className={styles.container}>
      <MainPage
        isMoved={movedMainPage}
        moveHandler={movePage}
        leftMoveHandler={moveToLeft}
        isMovedToLeft={moveMainPageToLeft}
        saveHandler={saveHandler}
      />
      <AddCourse isMoved={movedMainPage} moveHandler={movePage} />
      <ModifyCourse
        isMoved={moveMainPageToLeft}
        moveHandler={moveToLeft}
        data={modifyCourseData}
      />
    </div>
  );
};

export default ManageCourses;
