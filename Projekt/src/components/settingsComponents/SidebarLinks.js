import { NavLink } from "react-router-dom";
import style from "./SidebarLinks.module.css";

export default function SidebarLinks() {
  return (
    <div className={style.linksContainer}>
      <NavLink
        className={(navData) => {
          return `${style.link} ${navData.isActive ? style.active : ""}`;
        }}
        to="/settings/change_password"
      >
        Zmiana Hasła
      </NavLink>
      <NavLink
        className={(navData) => {
          return `${style.link} ${navData.isActive ? style.active : ""}`;
        }}
        to="/settings/manage_schools"
      >
        Zarządzaj Uczelniami
      </NavLink>
      <NavLink
        className={(navData) => {
          return `${style.link} ${navData.isActive ? style.active : ""}`;
        }}
        to="/settings/add_question"
      >
        Dodaj Pytanie
      </NavLink>
      <NavLink
        className={(navData) => {
          return `${style.link} ${navData.isActive ? style.active : ""}`;
        }}
        to="/settings/modify_question"
      >
        Modyfikuj Pytanie
      </NavLink>
      <NavLink
        className={(navData) => {
          return `${style.link} ${navData.isActive ? style.active : ""}`;
        }}
        to="/settings/manage_courses"
      >
        Zarządzaj Kursami
      </NavLink>
      <NavLink
        className={(navData) => {
          return `${style.link} ${navData.isActive ? style.active : ""}`;
        }}
        to="/settings/change_permissions"
      >
        Zmień Uprawnienia
      </NavLink>
    </div>
  );
}
