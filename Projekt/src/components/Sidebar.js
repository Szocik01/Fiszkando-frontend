import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

export default function Sidebar() {
  return (
    <Fragment>
      <nav className={`${style.sidebar} ${style.mainBar}`}></nav>
      <nav className={`${style.sidebar} ${style.slider}`}></nav>
    </Fragment>
  );
}
