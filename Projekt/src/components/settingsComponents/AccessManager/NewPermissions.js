import styles from "./styles/NewPermissions.module.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { informationBoxManagerActions } from "../../../storage/information-box";
import PermissionItem from "./PermissionItem";

const NewPermissions = (props) => {
  const [coursesList, setCoursesList] = useState([]);
  const dispatch = useDispatch();
  const auth = props.auth;

  const filterHandler = () => {
    const tmp = props.courses.filter((c) => {
      for (const course of props.checkedUser.permissions) {
        if (course.courseId === c._id) {
          return false;
        }
      }
      return true;
    });
    setCoursesList(tmp);
  };

  const grantAccessHandler = async (data) => {
    try {
      const res = await fetch("http://localhost:8080/grant-access", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          uid: auth.uid,
          token: auth.token,
          remeberMe: auth.remeberMe,
          "Content-Type": "application/json",
        },
      });
      const parsRes = await res.json();
      dispatch(informationBoxManagerActions.toggleVisibility());
      if (res.ok) {
        dispatch(
          informationBoxManagerActions.setBox({
            message: "Zmieniono uprawnienia.",
          })
        );
        props.reloadHandler(parsRes.permissions);
      } else {
        dispatch(
          informationBoxManagerActions.setBox({
            message: "Nie udało sie zmienić uprawnień.",
            isError: true,
          })
        );
      }
    } catch (err) {
      dispatch(
        informationBoxManagerActions.setBox({
          message: "Nie udało sie zmienić uprawnień.",
          isError: true,
        })
      );
    }
  };

  useEffect(() => {
    if (props.isSelected) {
      filterHandler();
    }
  }, [props.reload]);
  return (
    <div className={styles.container}>
      {!props.isSelected && (
        <h1 className={styles["info-h1"]}>Nie wybrano użytkownika.</h1>
      )}
      {props.isSelected && !props.checkedUser.isHeadAdmin && (
        <>
          <h1 className={styles.h1}>Nadaj uprawnienia</h1>
          <ul>
            {coursesList.map((c) => (
              <PermissionItem
                user={props.checkedUser}
                name={c.name}
                addBtn={true}
                submitHandler={grantAccessHandler}
                _id={c._id}
                key={c._id}
              />
            ))}
          </ul>
        </>
      )}
      {props.isSelected && props.checkedUser.isHeadAdmin && (
        <h1 className={styles["info-h1"]}>
          Użytkownik jest super administratorem.
        </h1>
      )}
    </div>
  );
};

export default NewPermissions;
