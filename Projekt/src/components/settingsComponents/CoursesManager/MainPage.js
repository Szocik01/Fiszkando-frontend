import SearchBar from "../CoursesManager/SearchBar";
import ListItem from "../CoursesManager/ListItem";
import styles from "./MainPage.module.css";

import { useState, useEffect } from "react";

const MainPage = (props) => {
  const [list, setList] = useState([]);
  const fetchAllCourses = async () => {
    const COURSES = [];
    try {
      const coursesNotParsed = await fetch(
        "http://localhost:8080/get-all-courses"
      );
      const parsedCourses = await coursesNotParsed.json();
      parsedCourses.forEach((c) => {
        COURSES.push(c);
      });
      setList(COURSES);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div
      className={`${styles.container} ${props.isMoved && styles.move} ${
        props.isMovedToLeft && styles.moveToLeft
      }`}
    >
      <SearchBar></SearchBar>
      <div className={styles.wraper}>
        <ul className={styles["list-container"]}>
          {list.map((c) => {
            return (
              <ListItem
                key={c._id}
                name={c.name}
                school={c.school}
                price={c.price}
                id={c._id}
                moveHandler={props.leftMoveHandler}
                saveHandler={props.saveHandler}
              />
            );
          })}
        </ul>
        <button className={styles.addBtn} onClick={props.moveHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="2rem"
            viewBox="0 0 24 24"
            width="2rem"
            fill="white"
          >
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
        </button>
      </div>
    </div>
  );
};

export default MainPage;
