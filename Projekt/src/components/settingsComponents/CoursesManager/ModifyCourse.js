import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./ModifyCourse.module.css";
import Input from "./Input";

const ModifyCourse = (props) => {
  const auth = useSelector((state) => state.autoIndentification);
  const finalData = {};
  console.log(props.data);

  const showValue = (val) => {
    for (const i in val) {
      finalData[i] = val[i];
    }
    console.log(finalData);
  };

  return (
    <div className={`${styles.container} ${props.isMoved && styles.move}`}>
      <button onClick={props.moveHandler} className={styles["return-btn"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="2rem"
          viewBox="0 0 24 24"
          width="2rem"
          fill="white"
        >
          <rect fill="none" height="24" width="24" />
          <path d="M9,19l1.41-1.41L5.83,13H22V11H5.83l4.59-4.59L9,5l-7,7L9,19z" />
        </svg>
        Powrót
      </button>
      <h1 className={styles.h1}>Modyfikuj Kurs</h1>
      <form className={styles.form}>
        <Input id="name" save={showValue} value={props.data.name}>
          Nazwa kursu
        </Input>
        <select className={styles.select}>
          {props.schools.map((s) => (
            <option
              value={s._id}
              key={s._id}
              defaultChecked={s._id === props.data.school._id}
            >
              {s.name}
            </option>
          ))}
        </select>
        <Input
          type="number"
          id="price"
          save={showValue}
          value={props.data.price}
        >
          Cena
        </Input>
        <button className={styles["confirm-btn"]}>ZAPISZ</button>
      </form>
    </div>
  );
};

export default ModifyCourse;
