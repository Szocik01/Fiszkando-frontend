import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./SidebarLinks.module.css";
import { Fragment,useEffect,useState } from "react";

export default function SidebarLinks() {
  
  const[canModify,setCanModify]=useState(false);

  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const isHeadAdmin = logindata.isHeadAdmin;
  const permissionsArray = logindata.permissions;

  useEffect(()=>{
    console.log("Wykonało się na linkach");
    for(const element of permissionsArray)
    {
      console.log("ile razy się wykona");
      if(element.modify.write)
      {
        setCanModify(true);
        break;
      }
      setCanModify(false);
    }
  },[permissionsArray]);

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
      {(isHeadAdmin || canModify) && <Fragment>
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
      </Fragment>}
      {isHeadAdmin && <Fragment>
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
          to="/settings/manage_courses"
        >
          Zarządzaj Kursami
        </NavLink>
        <NavLink
          className={(navData) => {
            return `${style.link} ${navData.isActive ? style.active : ""}`;
          }}
          to="/settings/manage_access"
        >
          Zmień Uprawnienia
        </NavLink>
      </Fragment>}
      <NavLink
        className={(navData) => {
          return `${style.link} ${navData.isActive ? style.active : ""}`;
        }}
        to="/settings/post_box"
      >
        Poczta
      </NavLink>
    </div>
  );
}
