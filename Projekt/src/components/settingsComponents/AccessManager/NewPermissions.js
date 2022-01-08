import styles from "./styles/NewPermissions.module.css";

import { useEffect, useState } from "react";
import PermissionItem from "./PermissionItem";

const NewPermissions = (props) => {
  const [coursesList, setCoursesList] = useState([]);
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
      console.log(parsRes);
    } catch (err) {
      console.log(err);
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
      {props.isSelected && (
        <>
          <h1 className={styles.h1}>Nadaj uprawnienia</h1>
          <ul>
            {coursesList.map((c) => (
              <PermissionItem
                name={c.name}
                addBtn={true}
                submitHandler={grantAccessHandler}
                _id={c._id}
                auth={auth}
                key={c._id}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NewPermissions;
