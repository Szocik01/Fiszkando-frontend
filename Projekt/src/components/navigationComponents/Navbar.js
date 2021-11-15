import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

export default function Navbar(props) {
  return (
    <nav className={style.navbar}>
      <div className={style.hamburgerContainer} onClick={props.onUnfolding}>
        <div className={style.hamburger}></div>
      </div>
      <NavLink className={style.logo} to="/">
        Logo
      </NavLink>
      <NavLink className={style.authButton} to="/authentication">
        Auth
      </NavLink>
    </nav>
  );
}
