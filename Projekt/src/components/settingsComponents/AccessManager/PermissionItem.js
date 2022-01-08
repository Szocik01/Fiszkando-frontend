import styles from "./styles/PermissionItem.module.css";

import { useRef } from "react";

const PermissionItem = (props) => {
  const write = useRef();
  const submitHandler = () => {
    const finalObj = {
      courseId: props._id,
      uid: props.user._id,
      write: write.current.checked,
    };
    props.submitHandler(finalObj);
  };

  const updateHandler = () => {
    const finalObj = {
      courseId: props._id,
      uid: props.user._id,
      write: write.current.checked,
    };
    props.updateHandler(finalObj);
  };
  return (
    <li className={`${styles.container}`}>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.actions}>
        {props.addBtn && (
          <button className={styles.modifyBtn} onClick={submitHandler}>
            Dodaj
          </button>
        )}

        {props.updateBtn && (
          <button className={styles.modifyBtn} onClick={updateHandler}>
            Aktualizuj
          </button>
        )}
        {props.deleteBtn && (
          <button className={styles.deleteBtn} onClick={submitHandler}>
            Usuń
          </button>
        )}
      </div>
      <form className={styles.form}>
        <label>
          <input type="checkbox" ref={write} defaultChecked={props.isChecked} />{" "}
          Modyfikacja
        </label>
      </form>
    </li>
  );
};

export default PermissionItem;
