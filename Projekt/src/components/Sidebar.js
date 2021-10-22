import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import "../fontello-fd764257/css/fontello.css";

export default function Sidebar() {
  return (
    <div className={style.sidebarContainer}>
      <nav className={`${style.sidebar} ${style.mainBar}`}>
        <ul className={style.sliderList}>
          <NavLink to="/" activeClassName={style.mainItemActive} exact>
            <li className={style.mainBarItem}>
              <i className={`icon-main ${style.iconFirst}`}></i>
            </li>
          </NavLink>
          <NavLink to="/questions" activeClassName={style.mainItemActive} exact>
            <li className={style.mainBarItem}>
              <i className={`icon-pytanie ${style.icon}`}></i>
            </li>
          </NavLink>
          <NavLink to="/test" activeClassName={style.mainItemActive} exact>
            <li className={style.mainBarItem}>
              <i className={`icon-test ${style.icon}`}></i>
            </li>
          </NavLink>
          <NavLink to="/question_base" activeClassName={style.mainItemActive} exact>
            <li className={style.mainBarItem}>
              <i className={`icon-baza ${style.icon}`}></i>
            </li>
          </NavLink>
          <NavLink to="/settings" activeClassName={style.mainItemActive} exact>
            <li className={style.mainBarItem}>
              <i className={`icon-ustawienia ${style.icon}`}></i>
            </li>
          </NavLink>
          <NavLink to="/mod" activeClassName={style.mainItemActive} exact>
            <li className={style.mainBarItem}>
              <i className={`icon-mod ${style.icon}`}></i>
            </li>
          </NavLink>
          <NavLink to="/admin" activeClassName={style.mainItemActive} exact>
            <li className={style.mainBarItem}>
              <i className={`icon-admin ${style.icon}`}></i>
            </li>
          </NavLink>
        </ul>
      </nav>
      <nav className={`${style.sidebar} ${style.slider}`}>
        <ul className={style.sliderList}>
          <NavLink
            to="/"
            activeClassName={style.sliderItemActive}
            className={style.navlinkStyle}
            exact
          >
            <li className={style.sliderItem}>Strona główna</li>
          </NavLink>
          <NavLink
            to="/questions"
            activeClassName={style.sliderItemActive}
            className={style.navlinkStyle}
            exact
          >
            <li className={style.sliderItem}>Pojedyncze pytania</li>
          </NavLink>
          <NavLink
            to="/test"
            activeClassName={style.sliderItemActive}
            className={style.navlinkStyle}
            exact
          >
            <li className={style.sliderItem}>Test wiedzy</li>
          </NavLink>
          <NavLink
            to="/question_base"
            activeClassName={style.sliderItemActive}
            className={style.navlinkStyle}
            exact
          >
            <li className={style.sliderItem}>Baza pytań</li>
          </NavLink>
          <NavLink
            to="/settings"
            activeClassName={style.sliderItemActive}
            className={style.navlinkStyle}
            exact
          >
            <li className={style.sliderItem}>Ustawienia konta</li>
          </NavLink>
          <NavLink
            to="/mod"
            activeClassName={style.sliderItemActive}
            className={style.navlinkStyle}
            exact
          >
            <li className={style.sliderItem}>Panel Mod</li>
          </NavLink>
          <NavLink
            to="/admin"
            activeClassName={style.sliderItemActive}
            className={style.navlinkStyle}
            exact
          >
            <li className={style.sliderItem}>Panel Admin</li>
          </NavLink>
          <li className={`${style.sliderItem} ${style.theme}`}>Theme</li>
        </ul>
      </nav>
    </div>
  );
}
