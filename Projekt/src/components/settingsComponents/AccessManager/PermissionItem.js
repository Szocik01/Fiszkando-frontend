import styles from "./styles/PermissionItem.module.css";

import { useRef } from "react";

const PermissionItem = (props) => {
  const auth = props.auth;
  const write = useRef();
  const submitHandler = () => {
    const finalObj = {
      courseId: props._id,
      uid: auth.uid,
      write: write.current.checked,
    };
    console.log(finalObj);
    props.submitHandler(finalObj);
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
        {props.deleteBtn && (
          <button className={styles.deleteBtn} onClick={submitHandler}>
            Usuń
          </button>
        )}
      </div>
      <form className={styles.form}>
        <label>
          <input type="checkbox" ref={write} /> Modyfikacja
        </label>
      </form>
    </li>
  );
};

export default PermissionItem;
