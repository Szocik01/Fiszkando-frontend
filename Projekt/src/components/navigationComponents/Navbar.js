import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

export default function Navbar() {

  return (
    <nav className={style.navbar}>
      <NavLink className={style.logo} to="/">
        Logo
      </NavLink>
      <div
        className={style.loginButtons}
      >
        <NavLink className={style.authButton} to="/authentication">
          Login
        </NavLink>
        <NavLink className={style.authButton} to="/authentication?=register">
          Register
        </NavLink>
      </div>
    </nav>
  );
}
