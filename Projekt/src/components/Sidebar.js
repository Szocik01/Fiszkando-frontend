import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import "../fontello-fd764257/css/fontello.css"
import { Fragment } from "react";

export default function Sidebar() {
  return (
    <Fragment>
      <nav className={`${style.sidebar} ${style.mainBar}`}>
        <ul className={style.sliderList}>
          <li className={style.mainBarItem}><i className={`icon-main ${style.iconFirst}`}></i></li>
          <li className={style.mainBarItem}><i className={`icon-pytanie ${style.icon}`}></i></li>
          <li className={style.mainBarItem}><i className={`icon-test ${style.icon}`}></i></li>
          <li className={style.mainBarItem}><i className={`icon-baza ${style.icon}`}></i></li>
          <li className={style.mainBarItem}><i className={`icon-ustawienia ${style.icon}`}></i></li>
          <li className={style.mainBarItem}><i className={`icon-mod ${style.icon}`}></i></li>
          <li className={style.mainBarItem}><i className={`icon-admin ${style.icon}`}></i></li>
        </ul>
      </nav>
      <nav className={`${style.sidebar} ${style.slider}`}>
        <ul className={style.sliderList}>
          <li className={style.sliderItem}>Strona główna</li>
          <li className={style.sliderItem}>Pojedyncze pytania</li>
          <li className={style.sliderItem}>Test wiedzy</li>
          <li className={style.sliderItem}>Baza pytań</li>
          <li className={style.sliderItem}>Ustawienia konta</li>
          <li className={style.sliderItem}>Panel Mod</li>
          <li className={style.sliderItem}>Panel Admin</li>
          <li className={`${style.sliderItem} ${style.theme}`}>Theme</li>
        </ul>
      </nav>
    </Fragment>
  );
}
