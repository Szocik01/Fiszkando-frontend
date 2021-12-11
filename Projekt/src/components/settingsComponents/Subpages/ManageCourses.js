import { useState, useEffect } from "react";

import SearchBar from "../CoursesManager/SearchBar";
import ListItem from "../CoursesManager/ListItem";
import styles from "./ManageCourses.module.css";

const COURSES = [];

const ManageCourses = (props) => {
  const [list, setList] = useState([]);
  const fetchAllCourses = async () => {
    try {
      const coursesNotParsed = await fetch(
        "http://localhost:8080/get-all-courses"
      );
      const parsedCourses = await coursesNotParsed.json();
      parsedCourses.forEach((c) => {
        COURSES.push(c);
      });
      setList(COURSES);
      console.log(COURSES);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <>
      <SearchBar></SearchBar>
      <div>
        <ul className={styles["list-container"]}>
          {list.map((c) => {
            return (
              <ListItem
                key={c._id}
                name={c.name}
                school={c.school}
                price={c.price}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ManageCourses;
