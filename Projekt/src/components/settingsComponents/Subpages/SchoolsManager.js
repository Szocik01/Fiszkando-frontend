import { useEffect, useState } from "react";

import MainPage from "../SchoolsManager/MainPage";
import AddSchool from "../SchoolsManager/AddSchool";
import Error from "../../UI/Error";
import LoadingSpinner from "../../UI/LoadingSpinner";

import styles from "./SchoolsManager.module.css";
import ModifySchool from "../SchoolsManager/ModifySchool";

const SchoolsManager = () => {
  const [initialSchools, setInitialSchools] = useState([]);
  const [schoolsList, setSchoolsList] = useState([]);
  const [modifyData, setModifyData] = useState({
    name: "",
    _id: "",
  });
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showModify, setShowModify] = useState(false);

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

  const filterHandler = (id) => {
    const arr = initialSchools.filter((c) => c._id.toString() !== id);
    setInitialSchools(arr);
    setSchoolsList(arr);
  };

  const modifyNameHandler = (school) => {
    const tmp = initialSchools;
    const ind = tmp.findIndex(
      (s) => s._id.toString() === school._id.toString()
    );
    tmp[ind].name = school.name;
    setInitialSchools(tmp);
    setSchoolsList(tmp);
  };

  const toggleLeftMove = () => setShowAddForm((p) => !p);
  const toggleModifyView = () => setShowModify((p) => !p);
  const passModifyData = (data) => setModifyData(data);

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
          showModifyHandler={toggleModifyView}
          leftMoveHandler={toggleLeftMove}
          passModifyData={passModifyData}
          filterHandler={filterHandler}
        />
      )}
      {!isError && !loading && (
        <AddSchool
          updateHandler={updateHandler}
          isMoved={showAddForm}
          moveHandler={toggleLeftMove}
        />
      )}
      {!isError && !loading && (
        <ModifySchool
          updateHandler={modifyNameHandler}
          isMoved={showModify}
          moveHandler={toggleModifyView}
          data={modifyData}
        />
      )}
    </div>
  );
};

export default SchoolsManager;
