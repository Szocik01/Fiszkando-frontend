import { useState, useEffect } from "react";

import styles from "./AddCourse.module.css";

const AddCourse = (props) => {
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
      <form>
        <input />
        {/* <select>
          {schools.map((s) => (
            <option value={s._id}>{s.name}</option>
          ))}
        </select> */}
      </form>
    </div>
  );
};

export default AddCourse;
