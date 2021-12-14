import { useState, useRef } from "react";
import styles from "./Input.module.css";
const Input = (props) => {
  const value = useRef();
  const [moving, setMoving] = useState(false);
  const [inputValide, setInputValide] = useState(true);

  const focusHandler = () => {
    setMoving(true);
    setInputValide(true);
  };
  const onBlurHandler = () => {
    if (value.current.value.trim() === "" || value.current.inputValide) {
      setMoving(false);
      setInputValide(false);
    }
  };
  const classInput = `${styles.input} ${props.className}`;
  const classLabel = `${styles.label} ${props.className}`;
  const onChangeHandler = (eve) => {
    if (props.addCourse) {
      const obj = {};
      obj[props.id] = value.current.value;
      return props.onChange(obj);
    }
    props.onChange(eve);
  };
  return (
    <div className={`${styles.input_container} ${props.containerStyles}`}>
      <label
        htmlFor={props.id}
        className={`${
          moving ? styles.labelTranstionOff : styles.labelTranstionOn
        } ${inputValide ? classLabel : styles.labelValid}`}
      >
        {props.children}
      </label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={onChangeHandler}
        className={`${inputValide ? classInput : styles.inputValide} ${
          props.inputStyles
        }`}
        onFocus={focusHandler}
        onBlur={onBlurHandler}
        ref={value}
      />
    </div>
  );
};

export default Input;
