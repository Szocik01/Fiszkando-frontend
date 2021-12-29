import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Input from "./Input";
import LoadingSpinner from "../../UI/LoadingSpinner";
import informationBoxManager from "../../../storage/information-box";

import styles from "./AddCourse.module.css";

const AddCourse = (props) => {
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const select = useRef();
  const auth = useSelector((state) => state.autoIndentification);
  const finalData = {};
  const dispatch = useDispatch();

  console.log(auth);

  const showValue = (val) => {
    for (const i in val) {
      finalData[i] = val[i];
    }
  };

  const submitHandler = async (eve) => {
    setLoading(true);
    eve.preventDefault();
    const reqBody = {
      name: finalData.name,
      price: +finalData.price,
      schoolId: select.current.value,
    };
    console.log(reqBody);
    try {
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
      setLoading(false);
      dispatch(informationBoxManager.actions.toggleVisibility());
      if (res.status === 201) {
        const parsedResponse = await res.json();
        props.refresh(parsedResponse.course);
        dispatch(
          informationBoxManager.actions.setBox({ message: "Dodano kurs!" })
        );
        setReset(true);
        setReset(false);
        props.moveHandler();
      } else {
        dispatch(
          informationBoxManager.actions.setBox({
            message: "Nie udało sie dodać kursu!",
            isError: true,
          })
        );
      }
    } catch (err) {
      setLoading(false);
      dispatch(informationBoxManager.actions.toggleVisibility());
      dispatch(
        informationBoxManager.actions.setBox({
          message: "Nie udało sie dodać kursu!",
          isError: true,
        })
      );
      console.log(err);
    }
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

      <div className={styles.form}>
        <form onSubmit={submitHandler}>
          <h1 className={styles.h1}>Dodaj Kurs</h1>
          <Input id="name" save={showValue} value={reset && ""}>
            Nazwa kursu
          </Input>

          <div className={`${styles.submitContainer}`}>
            <label className={styles.label}>Uczelnia</label>
            <select className={styles.select} ref={select}>
              {props.schools.map((s) => (
                <option
                  value={s._id}
                  key={s._id}
                  className={styles["select-options"]}
                >
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <Input type="number" id="price" save={showValue} value={reset && ""}>
            Cena
          </Input>
          <div
            className={`${styles["btn-container"]} ${loading && styles.scale}`}
          >
            {loading && <LoadingSpinner />}
            {!loading && (
              <button className={styles["confirm-btn"]}>DODAJ</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
