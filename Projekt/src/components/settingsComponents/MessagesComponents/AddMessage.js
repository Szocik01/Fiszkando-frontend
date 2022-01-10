import Input from "../CoursesManager/Input";
import styles from "./styles/AddMessage.module.css";

import { useState, useRef } from "react";

const AddMessage = (props) => {
  const [focusTextArea, setFocusTextArea] = useState(false);
  const textarea = useRef();

  const focusInputHandler = () => setFocusTextArea(true);
  const blurInputHandler = () =>
    setFocusTextArea(textarea.current.value ? true : false);
  return (
    <div className={`${styles.container} ${styles.show}`}>
      <form className={styles.form}>
        <h1 className={styles.h1}>Nowa wiadomość</h1>
        <Input>Do:</Input>
        <Input>Temat</Input>
        <div className={styles["textarea-box"]}>
          <label className={`${styles.label}`} htmlFor="message-textarea">
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
