import { useRef } from "react";
import styles from "./styles/EmailItem.module.css";

const EmailItem = (props) => {
  const checkbox = useRef();
  const showMessageBox = (e) => {
    if (e.target !== checkbox.current) {
      props.chooseMessageHandler(props.wholeMsg);
      props.showMessgaeBox();
      if (!props.readed) {
        props.readMessageHandler(props.id);
      }
    }
  };

  const setMessageToDeleteHandler = () => {
    props.setMessagesToDelete(props.id);
  };
  return (
    <li className={styles.container} onClick={showMessageBox}>
      <input
        type="checkbox"
        className={styles.checkbox}
        ref={checkbox}
        onChange={setMessageToDeleteHandler}
      />
      <div>Temat: {props.topic}</div>
      <div>Od: {props.author}</div>
      <div
        className={`${styles.status} ${
          props.readed ? styles["status--readed"] : styles["status--unreaded"]
        }`}
      >
        {props.readed ? "PRZECZYTANO" : "NIE ODCZYTANO"}
      </div>
    </li>
  );
};

export default EmailItem;
