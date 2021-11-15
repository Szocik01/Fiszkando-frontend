import { Fragment, useEffect, useRef } from "react";
import style from "./SettingsNavigation.module.css";
import SidebarLinks from "./SidebarLinks";

export default function SettingsNavigation(props) {
  const backdropRef = useRef();

  useEffect(() => {
    let showClassTimer;
    let hideClassTimer;

    if (props.isMenuActive === true) {
      backdropRef.current.classList.add(style.display);
      showClassTimer = setTimeout(() => {
        backdropRef.current.classList.add(style.show);
      }, 10);
    } else {
      backdropRef.current.classList.remove(style.show);
      hideClassTimer = setTimeout(() => {
        backdropRef.current.classList.remove(style.display);
      }, 210);
    }

    return () => {
      if (props.isMenuActive === true) {
        clearTimeout(showClassTimer);
      } else {
        clearTimeout(hideClassTimer);
      }
    };
  }, [props.isMenuActive]);

  return (
    <Fragment>
      <div
        className={style.backdrop}
        ref={backdropRef}
        onClick={props.onToggleMenu}></div>
      <div
        className={`${style.navigationContainer} ${
          props.isMenuActive ? style.visible : ""}`}>
        <div className={style.hamburgerContainer} onClick={props.onToggleMenu}>
          <div className={style.hamburger}></div>
          <div className={style.textContainer}>Zamknij</div>
        </div>
        <SidebarLinks/>
      </div>
    </Fragment>
  );
}
