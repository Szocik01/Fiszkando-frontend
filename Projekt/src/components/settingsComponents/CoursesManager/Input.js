import { useState, useEffect } from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const [inputValue, setInputValue] = useState("");

  const saveHandler = (event) => {
    setInputValue(event.target.value);
    const obj = {};
    obj[props.id] = event.target.value;
    props.save(obj);
  };

  useEffect(() => {
    if (props.value) {
      setInputValue(props.value);
    } else {
      setInputValue("");
    }
  }, [props.value]);

  return (
    <div className={`${styles.container}`}>
      <label
        className={`${styles.label} ${inputValue && styles["label--focused"]}`}
      >
        {props.children}
      </label>
      <input
        value={inputValue}
        onChange={saveHandler}
        className={`${styles.input}`}
        type={props.type || "text"}
      />
    </div>
  );
};

export default Input;
