import style from "./Settings.module.css";
import { useState, useEffect } from "react";
import SettingsNavigation from "../components/settingsComponents/SettingsNavigation";
import ContentContainer from "../components/settingsComponents/ContentContainer";
import { useDispatch, useSelector } from "react-redux";
import { positionActions } from "../storage/redux-index";
import { Route, Routes } from "react-router-dom";
import PasswordChange from "../components/settingsComponents/Subpages/PasswordChange";
import AddQuestion from "../components/settingsComponents/Subpages/AddQuestion";
import ManageCourses from "../components/settingsComponents/Subpages/ManageCourses";
import InformationBox from "../components/UI/InformationBox";
import Confirmation from "../components/UI/Confirmation";

export default function Settings() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const informationBox = useSelector((s) => s.informationBoxManager);
  const confirmationManager = useSelector((s) => s.confirmation);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(3 * 3.4));
  }, [dispatch]);

  function toggleMenuHandler() {
    setIsMenuActive((prevState) => {
      return !prevState;
    });
  }
  console.log(confirmationManager.isVisible);
  return (
    <>
      {confirmationManager.isVisible && <Confirmation />}
      <InformationBox
        show={informationBox.visible}
        isError={informationBox.isError}
      >
        {informationBox.message}
      </InformationBox>

      <div className={style.siteContainer}>
        <SettingsNavigation
          isMenuActive={isMenuActive}
          onToggleMenu={toggleMenuHandler}
        />
        <ContentContainer onToggleMenu={toggleMenuHandler}>
          <Routes>
            <Route path="change_password" element={<PasswordChange />} />
            <Route path="add_question" element={<AddQuestion />} />
            <Route path="manage_courses" element={<ManageCourses />}></Route>
          </Routes>
        </ContentContainer>
      </div>
    </>
  );
}
