import styles from "./AccessManager.module.css";

import UsersSelect from "../AccessManager/UsersSelect";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CurrentPermissions from "../AccessManager/CurrentPermissions";
import NewPermissions from "../AccessManager/NewPermissions";
import Error from "../../UI/Error";

const AccessManager = () => {
  const auth = useSelector((state) => state.autoIndentification);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [checkedUser, setCheckedUser] = useState({});
  const [reload, setReload] = useState(false);
  const [reloadAll, setReloadAll] = useState(false);
  const [error, setError] = useState(false);

  const fetchUsersHandler = async () => {
    setError(false);
    try {
      const usersRes = await fetch("http://localhost:8080/get-all-users", {
        method: "GET",
        headers: {
          uid: auth.uid,
          token: auth.token,
          remeberMe: auth.remeberMe,
          "Content-Type": "application/json",
        },
      });
      const parsUsers = await usersRes.json();
      setUsers(parsUsers.users);
      if (!usersRes.ok) {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const fetchAllCourses = async () => {
    setError(false);
    const COURSES = [];
    try {
      const coursesNotParsed = await fetch(
        "http://localhost:8080/get-all-courses"
      );
      const parsedCourses = await coursesNotParsed.json();
      parsedCourses.forEach((c) => {
        COURSES.push(c);
      });
      setCourses(COURSES);
      setReload((p) => !p);
      if (!coursesNotParsed.ok) {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const checkUserHandler = (uid) => {
    if (!uid) {
      return setCheckedUser({});
    }
    const id = users.findIndex((u) => u._id === uid);
    setCheckedUser(users[id]);
    setReload((p) => !p);
  };

  const completeAction = async () => {
    try {
      await fetchUsersHandler();
      await fetchAllCourses();
      if (checkedUser._id) {
        checkUserHandler(checkedUser._id);
      }
    } catch (err) {}
  };

  const toggleReload = (data) => {
    const us = checkedUser;
    us.permissions = data;
    setCheckedUser({ ...us });
    setReload((p) => !p);
  };

  useEffect(() => {
    completeAction();
  }, [reloadAll]);

  return (
    <>
      {error && <Error />}
      {!error && (
        <div className={styles.container}>
          <UsersSelect users={users} selectHandler={checkUserHandler} />
          <CurrentPermissions
            courses={courses}
            checkedUser={checkedUser}
            isSelected={!!checkedUser._id}
            reload={reload}
            auth={auth}
            reloadHandler={toggleReload}
          />
          <NewPermissions
            courses={courses}
            checkedUser={checkedUser}
            isSelected={!!checkedUser._id}
            reload={reload}
            auth={auth}
            reloadHandler={toggleReload}
          />
        </div>
      )}
    </>
  );
};

export default AccessManager;
