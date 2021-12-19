import { useState, useEffect } from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const saveHandler = (event) => {
    setInputValue(event.target.value);
    const obj = {};
    obj[props.id] = event.target.value;
    props.save(obj);
  };

  const selectInput = () => setIsSelected(true);
  const blurInput = () => {
    if (!inputValue) {
      setIsSelected(false);
    }
  };

  useEffect(() => {
    if (props.value) {
      setInputValue(props.value);
    } else {
      setInputValue("");
    }
  }, [props.value]);

  return (
    <div
      className={`${styles.container}`}
      onClick={selectInput}
      onBlur={blurInput}
    >
      <label
        className={`${styles.label} ${
          (inputValue || isSelected) && styles["label--focused"]
        }`}
        for={props.id}
      >
        {props.children}
      </label>
      <input
        value={inputValue}
        onChange={saveHandler}
        className={`${styles.input} ${styles.expanded}`}
        type={props.type || "text"}
        id={props.id}
      />
    </div>
  );
};

export default Input;
