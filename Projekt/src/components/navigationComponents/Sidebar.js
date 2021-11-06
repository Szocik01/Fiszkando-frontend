import style from "./Sidebar.module.css";
import SidebarElement from "./SidebarElement";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { positionActions } from "../../storage/redux-index";

export default function Sidebar() {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const dispatch = useDispatch();

  const position = useSelector((state) => {
    return state.sidebarPosition.hoverPosition;
  });

  function onMouseLeaveHandler() {
    dispatch(positionActions.onLeavePositionChange());
  }

  function onMouseEnterHandler() {
    //funkcja stworzona tylko dla pierwszego elementu stąd stała wartość 0
    dispatch(positionActions.hoverPositionChange(0));
  }

  function unfoldingHandler() {
    setIsUnfolded((prevState) => {
      return !prevState;
    });
  }
  //"3.4rem"
  return (
    <nav
      className={`${style.sidebarContainer} ${
        isUnfolded && style.sidebarUnfolded
      }`}
    >
      <div className={style.taggerDiv}>
        <div
          className={style.taggerElement}
          style={{ marginTop: `${position}rem` }}></div>
      </div>
      <ul className={style.sidebarLinkList} onMouseLeave={onMouseLeaveHandler}>
          <li
            className={`${style.linkContainer} ${
              position === 0 && style.hovered
            }`} onMouseEnter={onMouseEnterHandler}>
            <i
              onClick={unfoldingHandler}
              className={`icon-main ${style.icon} ${isUnfolded ? style.rotate : ""}`}
            ></i>
            <Link to="/" className={style.linkStyle}>
            <div className={style.linkTextContainer}>Strona główna</div>
            </Link>
          </li>
        <SidebarElement
          iconClass="icon-pytanie"
          link="/questions"
          linkText="Pojedyncze pytania"
          marginValue={1 * 3.4}
        />
        <SidebarElement
          iconClass="icon-test"
          link="/test"
          linkText="Test wiedzy"
          marginValue={2 * 3.4}
        />
        <SidebarElement
          iconClass="icon-baza"
          link="/question_base"
          linkText="Baza pytań"
          marginValue={3 * 3.4}
        />
        <SidebarElement
          iconClass="icon-ustawienia"
          link="/settings"
          linkText="Ustawienia"
          marginValue={4 * 3.4}
        />
        <SidebarElement
          iconClass="icon-my"
          link="/contact"
          linkText="Kontakt"
          marginValue={5 * 3.4}
        />
        <SidebarElement
          iconClass="icon-mod"
          link="/mod"
          linkText="Panel mod"
          marginValue={6 * 3.4}
        />
        <SidebarElement
          iconClass="icon-admin"
          link="/admin"
          linkText="Panel admin"
          marginValue={7 * 3.4}
        />
      </ul>
    </nav>
  );
}
