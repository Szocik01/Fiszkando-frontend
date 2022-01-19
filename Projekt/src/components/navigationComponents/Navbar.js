import { NavLink,useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Authoindenty } from "../../storage/redux-index";

export default function Navbar(props) {

  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const uid = logindata.uid;
  const token = logindata.token;

  const dispatch=useDispatch()

  const navigate=useNavigate();

  function logoutHandler()
  {
    dispatch(Authoindenty.IndetificationShow({
        uid: "",
        token: "",
        rememberToken: "",
        permissions: {isHeadAdmin:false,permissionArray:[]}
      }));
      document.cookie = "uid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "rememberToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      navigate("/authentication",{replace:false});
  }


  return (
    <nav className={style.navbar}>
      {uid && token && <div className={style.hamburgerContainer} onClick={props.onUnfolding}>
        <div className={style.hamburger}></div>
      </div>}
      <NavLink className={style.logo} to="/">
        Logo
      </NavLink>
      {!(uid && token) ? <NavLink className={style.authButton} to="/authentication">
        Login
      </NavLink> : <div className={style.authButton} onClick={logoutHandler}>Logout</div>}
    </nav>
  );
}
