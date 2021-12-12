import Backdrop from "../UI/Backdrop";
import style from "./ContentContainer.module.css";

export default function ContentContainer(props) {
  return (
    <section className={style.container}>
      <div className={style.hamburgerContainer} onClick={props.onToggleMenu}>
        <div className={style.hamburger}></div>
        <div className={style.textContainer}>Menu</div>
      </div>
      {props.children}
    </section>
  );
}
