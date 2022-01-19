import styles from "./ContainerCard.module.css";
import { useEffect, useState } from "react";

const ContainerCard = (props) => {
  const [cheackConponet, setCheackComponet] = useState(false);

  const cheackHandler = () => {
    setCheackComponet((prev) => !prev);
    props.sellectHandler(props.index);
  };

  useEffect(() => {
    setCheackComponet(false);
  }, [props.reset]);

  return (
    <div
      className={`${
        !props.isAnsweared && cheackConponet
          ? `${styles.main} ${styles.main_check}`
          : `${styles.main}`
      } ${
        props.isAnsweared && props.isCorrect
          ? styles.green
          : props.isAnsweared && !props.answerIsTrue && styles.red
      } ${props.trueAnsweared && props.isCorrect
          ? styles.green
          : ''}`
      }
      onClick={cheackHandler}
    >
      <div className={styles.title}>
        <p>{props.title}</p>
      </div>
      <div className={styles.image}>
        {props.foto && <img src={props.image} alt="foto" />}
      </div>
    </div>
  );
};

export default ContainerCard;
