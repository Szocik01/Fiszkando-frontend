import style from "./Sidebar.module.css";
import SidebarElement from "./SidebarElement";
import { useSelector, useDispatch } from "react-redux";
import { positionActions } from "../../storage/redux-index";

export default function Sidebar(props) {
  const dispatch = useDispatch();

  const position = useSelector((state) => {
    return state.sidebarPosition.hoverPosition;
  });


  function onMouseLeaveHandler() {
    dispatch(positionActions.onLeavePositionChange());
  }

  return (
    <nav
      className={`${style.sidebarContainer} ${
        props.isUnfolded && style.sidebarUnfolded}`}>
      {!(position===null) && <div className={style.taggerDiv}>
        <div
          className={style.taggerElement}
          style={{ marginTop: `${position}rem` }}></div>
      </div>}
      <div className={style.linkContainer} onClick={props.onUnfolding}>
        <i className={`icon-main ${style.icon} ${props.isUnfolded ? style.rotate : ""}`}></i>
        <div className={style.textContainer}>Zamknij</div>
      </div>
      <ul className={style.sidebarLinkList} onMouseLeave={onMouseLeaveHandler}>
        <SidebarElement
          iconClass="icon-pytanie"
          link="/questions"
          linkText="Pojedyncze pytania"
          marginValue={0}
        />
        <SidebarElement
          iconClass="icon-test"
          link="/test"
          linkText="Test wiedzy"
          marginValue={1 * 3.4}
        />
        <SidebarElement
          iconClass="icon-baza"
          link="/question_base"
          linkText="Baza pytań"
          marginValue={2 * 3.4}
        />
        <SidebarElement
          iconClass="icon-koszyk"
          link="/choose_course_to_buy"
          linkText="Wybór kursów"
          marginValue={3 * 3.4}
        />
          <SidebarElement
          iconClass="icon-portfel"
          link="/buy_course"
          linkText="Płatności"
          marginValue={4 * 3.4}
        />
        <SidebarElement
          iconClass="icon-ustawienia"
          link="/settings/change_password"
          linkText="Ustawienia"
          marginValue={5 * 3.4}
        />
        <SidebarElement
          iconClass="icon-my"
          link="/contact"
          linkText="Kontakt"
          marginValue={6 * 3.4}
        />
      </ul>
    </nav>
  );
}
