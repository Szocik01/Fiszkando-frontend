import styles from "./styles/ListItem.module.css";
import { informationBoxManagerActions } from "../../../storage/information-box";
import { confirmationActions } from "../../../storage/confirmation";
import { useDispatch } from "react-redux";

const ListItem = (props) => {
  const dispatch = useDispatch();

  const modifyHandler = () => {
    const data = {
      name: props.name,
      _id: props.id,
    };
    props.passModifyData(data);
    props.moveHandler();
  };

  const removeItem = async (obj, auth) => {
    const res = await fetch("http://localhost:8080/remove-school", {
      method: "POST",
      body: JSON.stringify({ schoolId: obj.id }),
      headers: {
        uid: auth.uid,
        token: auth.token,
        remeberMe: auth.remeberMe,
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      props.filterHandler(obj.id);
      dispatch(
        informationBoxManagerActions.setBox({
          message: "Pomyślnie usunieto kurs.",
        })
      );
    } else {
      dispatch(
        informationBoxManagerActions.setBox({
          message: "Nie udało sie usunąć kursu.",
          isError: true,
        })
      );
    }
  };

  const deleteHandler = () => {
    dispatch(
      confirmationActions.setMessage("Czy na pewno chcesz usunąć tą uczelnie?")
    );
    dispatch(confirmationActions.setBody({ id: props.id }));
    dispatch(confirmationActions.setHandler(removeItem));
    dispatch(confirmationActions.setOn());
  };

  return (
    <li className={styles.container}>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.actions}>
        <button className={styles.modifyBtn} onClick={modifyHandler}>
          Modyfikuj{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="white"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
        <button className={styles.deleteBtn} onClick={deleteHandler}>
          Usuń
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="white"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default ListItem;
