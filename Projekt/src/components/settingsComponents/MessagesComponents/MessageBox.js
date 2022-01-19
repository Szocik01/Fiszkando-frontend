import { useRef } from "react";
import styles from "./styles/MessageBox.module.css";

const MessageBox = (props) => {
  const background = useRef();
  const closeHandler = (e) => {
    if (e.target === background.current) {
      props.showHandler();
    }
  };
  return (
    <div
      className={`${styles.container} ${props.isMoved && styles.showBox}`}
      ref={background}
      onClick={closeHandler}
    >
      <div className={styles.message}>
        <h1 className={styles.h1}>
          Wiadomość
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
        <div className={styles["message__topic"]}>
          <div className={styles["message__topic--description"]}>Od</div>
          <div>{props.data.from}</div>
        </div>
        <div className={styles["message__topic"]}>
          <div className={styles["message__topic--description"]}>Temat</div>
          <div>{props.data.topic}</div>
        </div>
        <div className={styles.message__msg}>
          <div className={styles["message__topic--description"]}>Wiadomość</div>
          <div>{props.data.message}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
