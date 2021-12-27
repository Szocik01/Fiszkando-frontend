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

  const initialLoadHandler = async () => {
    const SCHOOLS = [];
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/get-all-schools");
      const parsedRes = await res.json();
      parsedRes.forEach((s) => SCHOOLS.push(s));
      setLoading(false);
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

  useEffect(() => {
    initialLoadHandler();
  });
  return (
    <div className={styles.container}>
      {loading && <LoadingSpinner />}
      {isError && !loading && <Error />}
      {!isError && !loading && (
        <MainPage
          schoolsList={schoolsList}
          initialSchoolsList={initialSchools}
        />
      )}
      {!isError && !loading && <AddSchool updateHandler={updateHandler} />}
    </div>
  );
};

export default SchoolsManager;
