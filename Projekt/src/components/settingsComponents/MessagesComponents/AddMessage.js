import Input from "../CoursesManager/Input";
import styles from "./styles/AddMessage.module.css";

import { useState, useRef } from "react";
import { useSelector } from "react-redux";

const AddMessage = (props) => {
  const auth = useSelector((state) => state.autoIndentification);
  const [focusTextArea, setFocusTextArea] = useState(false);
  const [data, setData] = useState({});
  const textarea = useRef();
  const background = useRef();

  const focusInputHandler = () => setFocusTextArea(true);
  const blurInputHandler = () =>
    setFocusTextArea(textarea.current.value ? true : false);

  const saveDataHandler = (obj) => {
    setData((p) => ({ ...p, ...obj }));
    console.log(obj);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const finalObj = { ...data };
    finalObj.message = textarea.current.value;
    finalObj.toAdmins = false;
    finalObj.from = auth.uid;
    console.log(finalObj);

    const res = await fetch("http://localhost:8080/send-email", {
      method: "POST",
      body: JSON.stringify(finalObj),
      headers: {
        uid: auth.uid,
        token: auth.token,
        remeberMe: auth.remeberMe,
        "Content-Type": "application/json",
      },
    });

    console.log(res.status);
  };

  const closeHandler = (e) => {
    if (e.target === background.current) {
      props.showHandler();
    }
  };

  return (
    <div
      className={`${styles.container} ${props.isMoved && styles.show}`}
      ref={background}
      onClick={closeHandler}
    >
      <form className={styles.form} onSubmit={submitHandler}>
        <h1 className={styles.h1}>
          Nowa wiadomość
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2rem"
            viewBox="0 0 24 24"
            width="2rem"
            fill="rgb(65, 65, 65)"
            className={styles.svg}
            onClick={props.showHandler}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </h1>
        <Input type="email" id="to" save={saveDataHandler}>
          Do:
        </Input>
        <Input id="topic" save={saveDataHandler}>
          Temat
        </Input>
        <div className={styles["textarea-box"]}>
          <label
            className={`${styles.label} ${
              focusTextArea && styles["label--focused"]
            }`}
            htmlFor="message-textarea"
          >
            Wiadomość
          </label>
          <textarea
            ref={textarea}
            onFocus={focusInputHandler}
            onBlur={blurInputHandler}
            className={`${styles.textarea} ${
              focusTextArea && styles["expanded-textarea"]
            }`}
            id="message-textarea"
          ></textarea>
        </div>
        <button className={styles.button}>Wyślij</button>
      </form>
    </div>
  );
};

export default AddMessage;
