import styles from "./styles/ModifySchool.module.css";

import Input from "../CoursesManager/Input";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { informationBoxManagerActions } from "../../../storage/information-box";

import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const ModifySchool = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const background = useRef();
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.autoIndentification);

  const submitHandler = async (e) => {
    e.preventDefault();
    data.schoolId = props.data._id;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/update-school-name", {
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
      if (res.ok) {
        dispatch(
          informationBoxManagerActions.setBox({
            message: "Zmieniono nazwę uczelni.",
          })
        );
        props.updateHandler(parsedRes.school);
        props.moveHandler();
      } else {
        dispatch(
          informationBoxManagerActions.setBox({
            message: "Nie udało sie zmienić nazwy.",
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

  const closeHandler = (e) => {
    if (e.target === background.current) {
      props.moveHandler();
    }
  };
  return (
    <div
      className={`${styles.container} ${props.isMoved && styles.moveIn}`}
      ref={background}
      onClick={closeHandler}
    >
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
        <h1 className={styles.h1}>Edytuj nazwe</h1>
        <Input id="name" save={saveHandler} value={props.data.name}>
          Nazwa uczelni
        </Input>
        <div
          className={`${styles["btn-container"]} ${loading && styles.scale}`}
        >
          {loading && <LoadingSpinner />}
          {!loading && (
            <button className={styles["confirm-btn"]}>ZAPISZ</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ModifySchool;
