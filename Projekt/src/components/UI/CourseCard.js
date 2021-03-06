import styles from "./CourseCard.module.css";
import { useState } from "react";

const CourseCard = (props) => {
  const [moveBackDrop, setMoveBackDrop] = useState(false);
  const moveHandelr = () => {
    setMoveBackDrop(true);
  };
  const offBackDrop = () => {
    setMoveBackDrop(false);
  };
  const RedirectionHandler = () => {
    props.funkcja(props.index);
  };
  return (
    <div
      className={styles.container}
      onMouseLeave={offBackDrop}
      onClick={RedirectionHandler}
    >
      <div
        className={`${styles.backdrop} ${
          (moveBackDrop || props.obecnyIndex === props.index) &&
          styles.backdropMove
        } 
                ${props.obecnyIndex === props.index && styles.backdrop_cheack}`}
      >
        <p>WYBIERZ</p>
      </div>
      <div className={styles.mainCard} onMouseMove={moveHandelr}>
        <div className={styles.image}>
          <img src={props.logo} alt="logo" />
        </div>
        <div className={styles.title}>
          <p>{props.title}</p>
        </div>
        <div className={styles.info}>
          <p>{props.nameschool}</p>
        </div>
      </div>
    </div>
  );
};
export default CourseCard;
