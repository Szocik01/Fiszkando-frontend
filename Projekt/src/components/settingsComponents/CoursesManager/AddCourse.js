import { useRef } from "react";
import { useSelector } from "react-redux";

import Input from "./Input";

import styles from "./AddCourse.module.css";

const AddCourse = (props) => {
  const select = useRef();
  const auth = useSelector((state) => state.autoIndentification);
  const finalData = {};

  const showValue = (val) => {
    for (const i in val) {
      finalData[i] = val[i];
    }
    console.log(finalData);
  };

  const submitHandler = async (eve) => {
    eve.preventDefault();
    const reqBody = {
      name: finalData.name,
      price: +finalData.price,
      schoolId: select.current.value,
    };
    const res = await fetch("http://localhost:8080/add-course", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        uid: auth.uid,
        token: auth.token,
        remeberMe: auth.remeberMe,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
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
      <h1 className={styles.h1}>Dodaj Kurs</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        <Input id="name" save={showValue}>
          Nazwa kursu
        </Input>
        <select className={styles.select} ref={select}>
          {props.schools.map((s) => (
            <option value={s._id} key={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <Input type="number" id="price" save={showValue}>
          Cena
        </Input>
        <button className={styles["confirm-btn"]}>DODAJ</button>
      </form>
    </div>
  );
};

export default AddCourse;
