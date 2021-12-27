import { useEffect, useState } from "react";

import MainPage from "../SchoolsManager/MainPage";
import Error from "../../UI/Error";

import styles from "./SchoolsManager.module.css";

const SchoolsManager = () => {
  const [initialSchools, setInitialSchools] = useState([]);
  const [schoolsList, setSchoolsList] = useState([]);
  const [isError, setIsError] = useState(false);

  const initialLoadHandler = async () => {
    const SCHOOLS = [];
    const res = await fetch("http://localhost:8080/get-all-schools");
    const parsedRes = await res.json();
    parsedRes.forEach((s) => SCHOOLS.push(s));
    if (res.status === 200) {
      setInitialSchools(SCHOOLS);
      setSchoolsList(SCHOOLS);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    initialLoadHandler();
  });
  return (
    <div className={styles.container}>
      {isError && <Error />}
      {!isError && (
        <MainPage
          schoolsList={schoolsList}
          initialSchoolsList={initialSchools}
        />
      )}
    </div>
  );
};

export default SchoolsManager;
