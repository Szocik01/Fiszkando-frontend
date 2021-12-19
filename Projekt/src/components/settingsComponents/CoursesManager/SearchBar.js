import { useState, useRef } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [showInput, setShowInput] = useState(false);
  const input = useRef();

  const buttonClickHandler = () => {
    if (!input.current.value) {
      setShowInput(true);
      input.current.focus();
    }
  };

  const blurInputHandler = () => {
    if (!input.current.value) {
      setShowInput(false);
    }
  };

  const changeHandler = () => {
    const val = input.current.value.toLowerCase();
    const newArr = [];
    props.courses.forEach((element) => {
      if (element.name.toLowerCase().search(val) > -1) {
        newArr.push(element);
      }
    });
    if (!val) {
      return props.filter(props.initialCourses);
    }
    props.filter(newArr);
  };

  return (
    <div className={`${styles.container}`}>
      <input
        type="text"
        className={`${styles.input} ${showInput && styles.show}`}
        ref={input}
        onBlur={blurInputHandler}
        onChange={changeHandler}
      />
      <button
        className={`${styles.questionMark} ${showInput && styles.setAnimation}`}
        onClick={buttonClickHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="27px"
          viewBox="0 0 24 24"
          width="24px"
          fill="white"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
