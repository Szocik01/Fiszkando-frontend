import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Input from "../../formComponents/Input";

import styles from "./AddCourse.module.css";

const AddCourse = (props) => {
  const [schools, setSchools] = useState([]);
  const auth = useSelector((state) => state.autoIndentification);
  console.log(auth);
  const finalData = {};
  const getSchools = async () => {
    const SCHOOLS = [];
    try {
      const res = await fetch("http://localhost:8080/get-all-schools");
      const parsed = await res.json();
      parsed.forEach((s) => SCHOOLS.push(s));
      setSchools(SCHOOLS);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSchools();
  }, []);

  const showValue = (val) => {
    for (const i in val) {
      finalData[i] = val[i];
    }
    console.log(finalData);
  };
  return (
    <div className={`${styles.container} ${props.isMoved && styles.move}`}>
      <button onClick={props.moveHandler} className={styles["return-btn"]}>
        Powrót
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="2rem"
          viewBox="0 0 24 24"
          width="2rem"
          fill="white"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>
      </button>
      <h1>Dodaj Kurs</h1>
      <form className={styles.form}>
        <Input
          id="name"
          onChange={showValue}
          inputStyles={styles.input}
          containerStyles={styles["litle-container"]}
          addCourse={true}
        >
          Nazwa kursu
        </Input>
        <select className={styles.select}>
          {schools.map((s) => (
            <option value={s._id} key={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <Input
          type="number"
          id="price"
          onChange={showValue}
          inputStyles={styles.input}
          containerStyles={styles["litle-container"]}
          addCourse={true}
        >
          Cena
        </Input>
        <button className={styles["confirm-btn"]}>DODAJ</button>
      </form>
    </div>
  );
};

export default AddCourse;
