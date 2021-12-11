import style from "./Settings.module.css";
import { useState } from "react";
import SettingsNavigation from "../components/settingsComponents/SettingsNavigation";
import ContentContainer from "../components/settingsComponents/ContentContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux-index";
import { Route,Routes } from "react-router-dom";
import PasswordChange from "../components/settingsComponents/Subpages/PasswordChange";
import AddQuestion from "../components/settingsComponents/Subpages/AddQuestion";

export default function Settings() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(3*3.4));
    },[dispatch]);

  function toggleMenuHandler() {
    setIsMenuActive((prevState) => {
      return !prevState;
    });
  }

  return (
    <div className={style.siteContainer}>
      <SettingsNavigation isMenuActive={isMenuActive} onToggleMenu={toggleMenuHandler}/>
      <ContentContainer onToggleMenu={toggleMenuHandler}>
        <Routes>
          <Route path="change_password" element={<PasswordChange/>}/>
          <Route path="add_question" element={<AddQuestion/>}/>
          <Route path="manage_courses"></Route>
        </Routes>
      </ContentContainer>
    </div>
  );
}
