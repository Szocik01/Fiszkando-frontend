import { Fragment } from "react";
import Backdrop from "../UI/Backdrop";
import style from "./ContentContainer.module.css";

export default function ContentContainer(props) {
  return (
    <Fragment>
      <div className={style.hamburgerContainer} onClick={props.onToggleMenu}>
        <div className={style.hamburger}></div>
        <div className={style.textContainer}>Menu</div>
      </div>
    <section className={style.container}>
      {props.children}
    </section>
    </Fragment>
  );
}
