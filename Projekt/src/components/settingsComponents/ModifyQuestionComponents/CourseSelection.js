import { useCallback, useEffect, useState } from "react";
import SearchBar from "../CoursesManager/SearchBar";
import NotFound from "../../UI/NotFound";
import ListItem from "./ListItem";
import style from "./DataSelection.module.css";
import { useSelector } from "react-redux";

export default function CourseSelection(props) {
  const [currentCourses, setCurrentCourses] = useState([]);
  const [initialCourses, setInitialCourses] = useState([]);

  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const isHeadAdmin = logindata.isHeadAdmin;
  const permissionsArray = logindata.permissions;
  console.log(permissionsArray)

  const { setHttpError, setIsSpinnerActive } = props;

  const getCourses = useCallback(async () => {
    try {
      setIsSpinnerActive(true);
      const response = await fetch("http://localhost:8080/get-all-courses");
      if (!response.ok) {
        throw new Error("Nieoczekiwany błąd serwera");
      }
      const data = await response.json();
      if(isHeadAdmin)
      {
        setInitialCourses(data);
        setCurrentCourses(data);
      }
      else if(permissionsArray.length>0)
      {
        const filteredCourses=[];
        for(const perm of permissionsArray)
        {
          for(const course of data)
          {
            if(perm.courseId===course._id && perm.modify.write)
            {
              filteredCourses.push(course);
            }
          }
        }
        setInitialCourses(filteredCourses);
        setCurrentCourses(filteredCourses);
      }
      setIsSpinnerActive(false);
    } catch (error) {
      setHttpError(error.message);
      setIsSpinnerActive(false);
    }
  }, [setHttpError, setCurrentCourses, setIsSpinnerActive]);

  function filter(array) {
    console.log(array);
    setCurrentCourses(array);
  }

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <div
      className={`${style.coursesSiteContainer} ${
        !(props.position === "courses") ? style.hidden : ""
      }`}
    >
      <SearchBar
        filter={filter}
        courses={currentCourses}
        initialCourses={initialCourses}/>
      <div className={style.wraper}>
        {currentCourses.length > 0 && (
          <ul className={style.listContainer}>
            {currentCourses.map((element) => {
              return (
                <ListItem
                  key={element._id}
                  name={element.name}
                  school={element.school}
                  price={element.price}
                  id={element._id}
                  position={props.position}
                  setPosition={props.setPosition}
                  setCourseId={props.setCourseId}
                />
              );
            })}
          </ul>
        )}
        {currentCourses.length === 0 && (
          <NotFound>Nie znaleziono żadnych kursów.</NotFound>
        )}
      </div>
    </div>
  );
}
