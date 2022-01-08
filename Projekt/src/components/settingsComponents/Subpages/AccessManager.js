import styles from "./AccessManager.module.css";

import UsersSelect from "../AccessManager/UsersSelect";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CurrentPermissions from "../AccessManager/CurrentPermissions";
import NewPermissions from "../AccessManager/NewPermissions";

const AccessManager = () => {
  const auth = useSelector((state) => state.autoIndentification);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [checkedUser, setCheckedUser] = useState({});
  const [reload, setReload] = useState(false);

  const fetchUsersHandler = async () => {
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
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllCourses = async () => {
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
    } catch (err) {
      console.log(err);
    }
  };

  const checkUserHandler = (uid) => {
    setReload((p) => !p);
    if (!uid) {
      return setCheckedUser({});
    }
    const id = users.findIndex((u) => u._id === uid);
    setCheckedUser(users[id]);
    console.log(users[id]);
  };

  useEffect(() => {
    fetchUsersHandler();
    fetchAllCourses();
  }, []);

  return (
    <div className={styles.container}>
      <UsersSelect users={users} selectHandler={checkUserHandler} />
      <CurrentPermissions
        courses={courses}
        checkedUser={checkedUser}
        isSelected={!!checkedUser._id}
        reload={reload}
      />
      <NewPermissions
        courses={courses}
        checkedUser={checkedUser}
        isSelected={!!checkedUser._id}
        reload={reload}
        auth={auth}
      />
    </div>
  );
};

export default AccessManager;
