import PermissionItem from "./PermissionItem";
import styles from "./styles/CurrentPermissions.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { informationBoxManagerActions } from "../../../storage/information-box";

const CurrentPermissions = (props) => {
  const auth = props.auth;
  const [permissionList, setPermissionList] = useState([]);
  const dispatch = useDispatch();
  const permissionListHandler = () => {
    const tmp = [];
    for (const permission of props.checkedUser.permissions) {
      for (const course of props.courses) {
        if (course._id === permission.courseId) {
          course.modify = permission.modify.write;
          tmp.push(course);
          break;
        }
      }
    }
    setPermissionList(tmp);
  };

  const removePermissionHandler = async (data) => {
    try {
      const delRes = await fetch("http://localhost:8080/remove-user-access", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          uid: auth.uid,
          token: auth.token,
          remeberMe: auth.remeberMe,
          "Content-Type": "application/json",
        },
      });
      const parsRes = await delRes.json();
      dispatch(informationBoxManagerActions.toggleVisibility());
      if (delRes.ok) {
        props.reloadHandler(parsRes.permissions);
        dispatch(
          informationBoxManagerActions.setBox({
            message: "Usunięto uprawnienia.",
          })
        );
      } else {
        dispatch(
          informationBoxManagerActions.setBox({
            message: "Nie udało sie usunąć uprawnień.",
            isError: true,
          })
        );
      }
    } catch (err) {
      dispatch(informationBoxManagerActions.toggleVisibility());
      dispatch(
        informationBoxManagerActions.setBox({
          message: "Nie udało sie usunąć uprawnień.",
          isError: true,
        })
      );
      console.log(err);
    }
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
      dispatch(informationBoxManagerActions.toggleVisibility());
      dispatch(
        informationBoxManagerActions.setBox({
          message: "Nie udało sie zmienić uprawnień.",
          isError: true,
        })
      );
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.isSelected) {
      permissionListHandler();
    }
  }, [props.reload]);
  return (
    <div className={styles.container}>
      {!props.isSelected && (
        <h1 className={styles["info-h1"]}>Nie wybrano użytkownika.</h1>
      )}
      {props.isSelected && !props.checkedUser.isHeadAdmin && (
        <>
          <h1 className={styles.h1}>Obecne uprawnienia</h1>
          <ul>
            {permissionList.map((p) => (
              <PermissionItem
                name={p.name}
                isChecked={p.modify}
                deleteBtn={true}
                updateBtn={true}
                key={p._id}
                _id={p._id}
                submitHandler={removePermissionHandler}
                user={props.checkedUser}
                updateHandler={grantAccessHandler}
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

export default CurrentPermissions;
