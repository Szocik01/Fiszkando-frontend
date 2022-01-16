import "../../fontello-358aa29e/css/fontello.css";
import { Link } from "react-router-dom";
import style from "./SidebarElement.module.css";
import { useDispatch,useSelector } from "react-redux";
import { positionActions } from "../../storage/redux-index";

export default function SidebarElement(props) {

  const dispatch=useDispatch();
  const position=useSelector((state)=>{return state.sidebarPosition.hoverPosition;})


  function onMouseEnterHandler()
  {
    dispatch(positionActions.hoverPositionChange(props.marginValue))
  }

  return (
    <Link to={props.link} className={style.linkStyle}>
      <li className={`${style.linkContainer} ${position===props.marginValue && style.hovered}`} onMouseEnter={onMouseEnterHandler}>
        <i className={`${props.iconClass} ${style.icon}`}></i>
        <div className={style.linkTextContainer}>{props.linkText}</div>
      </li>
    </Link>
  );
}
