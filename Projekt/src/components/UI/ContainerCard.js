import styles from "./ContainerCard.module.css";
import { useState } from "react";



const ContainerCard = (props) => {
  const [cheackConponet, setCheackComponet] = useState(false);

  const cheackHandler = () =>{
    setCheackComponet(prev=>!prev);
    props.sellectHandler(props.index);
  }


  return (
    <div className={cheackConponet ? `${styles.main} ${styles.main_check}`:`${styles.main} ${props.className}`} onClick={cheackHandler}>
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
