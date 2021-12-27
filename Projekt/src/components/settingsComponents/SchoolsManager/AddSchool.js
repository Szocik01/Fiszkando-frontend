import styles from "./styles/AddSchool.module.css";

import Input from "../CoursesManager/Input";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { informationBoxManagerActions } from "../../../storage/information-box";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const AddSchool = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.autoIndentification);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReset(false);
    try {
      const res = await fetch("http://localhost:8080/add-school", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          uid: auth.uid,
          token: auth.token,
          remeberMe: auth.remeberMe,
          "Content-Type": "application/json",
        },
      });
      const parsedRes = await res.json();

      dispatch(informationBoxManagerActions.toggleVisibility());
      if (res.status === 201) {
        dispatch(
          informationBoxManagerActions.setBox({
            message: "Dodano uczelnię.",
          })
        );
        setReset(true);
        props.updateHandler(parsedRes.school);
        props.moveHandler();
      } else {
        dispatch(
          informationBoxManagerActions.setBox({
            message: "Nie udało sie dodać uczelni.",
            isError: true,
          })
        );
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      dispatch(
        informationBoxManagerActions.setBox({
          message: "Nie udało sie dodać uczelni.",
          isError: true,
        })
      );
    }
  };

  const saveHandler = (obj) => {
    setData(obj);
  };

  return (
    <div className={`${styles.container} ${props.isMoved && styles.moveIn}`}>
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
      <form className={styles["form-container"]} onSubmit={submitHandler}>
        <h1 className={styles.h1}>Dodaj uczelnię</h1>
        <Input id="schoolName" save={saveHandler} value={reset && ""}>
          Nazwa uczelni
        </Input>
        <div
          className={`${styles["btn-container"]} ${loading && styles.scale}`}
        >
          {loading && <LoadingSpinner />}
          {!loading && <button className={styles["confirm-btn"]}>DODAJ</button>}
        </div>
      </form>
    </div>
  );
};

export default AddSchool;
