import { useEffect, useState } from "react";

import MainPage from "../SchoolsManager/MainPage";
import AddSchool from "../SchoolsManager/AddSchool";
import Error from "../../UI/Error";
import LoadingSpinner from "../../UI/LoadingSpinner";

import styles from "./SchoolsManager.module.css";

const SchoolsManager = () => {
  const [initialSchools, setInitialSchools] = useState([]);
  const [schoolsList, setSchoolsList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leftMove, setLeftMove] = useState(false);

  const initialLoadHandler = async () => {
    const SCHOOLS = [];
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/get-all-schools");
      const parsedRes = await res.json();
      setLoading(false);
      parsedRes.forEach((s) => SCHOOLS.push(s));

      if (res.status === 200) {
        setInitialSchools(SCHOOLS);
        setSchoolsList(SCHOOLS);
      } else {
        setIsError(true);
      }
    } catch (err) {
      setLoading(false);
      setIsError(true);
    }
  };

  const updateHandler = (school) => {
    const SCHOOLS = initialSchools;
    SCHOOLS.push(school);
    setInitialSchools(SCHOOLS);
    setSchoolsList(SCHOOLS);
  };

  const toggleLeftMove = () => setLeftMove((p) => !p);

  useEffect(() => {
    initialLoadHandler();
  }, []);
  return (
    <div className={styles.container}>
      {loading && <LoadingSpinner />}
      {isError && !loading && <Error />}
      {!isError && !loading && (
        <MainPage
          schoolsList={schoolsList}
          initialSchoolsList={initialSchools}
          isLeftMoved={leftMove}
          leftMoveHandler={toggleLeftMove}
        />
      )}
      {!isError && !loading && (
        <AddSchool
          updateHandler={updateHandler}
          isMoved={leftMove}
          moveHandler={toggleLeftMove}
        />
      )}
    </div>
  );
};

export default SchoolsManager;
