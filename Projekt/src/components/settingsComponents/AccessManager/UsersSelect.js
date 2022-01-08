import styles from "./styles/UsersSelect.module.css";
import { useRef } from "react";

const UsersSelect = (props) => {
  const select = useRef();
  const checkHandler = () => {
    props.selectHandler(select.current.value);
  };
  return (
    <div className={styles.container}>
      <h1>Wybierz użytkownika</h1>
      <select
        multiple={true}
        className={styles.select}
        onChange={checkHandler}
        ref={select}
      >
        {props.users.map((u) => (
          <option
            value={u._id}
            key={u._id}
            className={`${u.isHeadAdmin && styles["select--super-admin"]}`}
          >
            {u.username}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UsersSelect;
