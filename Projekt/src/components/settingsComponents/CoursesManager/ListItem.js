import styles from "./ListItem.module.css";
import { useDispatch } from "react-redux";
import { confirmationActions } from "../../../storage/confirmation";
import { informationBoxManagerActions } from "../../../storage/information-box";
import { useRef } from "react";

const ListItem = (props) => {
  const lastItem = useRef();
  const dispatch = useDispatch();
  const modifyInitialHandler = () => {
    props.saveHandler({
      name: props.name,
      price: props.price,
      school: props.school,
      _id: props.id,
    });
    props.moveHandler();
  };

  // const lastItemScrollHandler = () => {
  //   if (props.lastItem === props.id) {
  //     lastItem.current.scrollIntoView();
  //   }
  // };

  const removeItem = async (obj, auth) => {
    const res = await fetch("http://localhost:8080/delete-course", {
      method: "POST",
      body: JSON.stringify({ id: obj.id }),
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
      confirmationActions.setMessage("Czy na pewno chcesz usunąć ten kurs?")
    );
    dispatch(confirmationActions.setBody({ id: props.id }));
    dispatch(confirmationActions.setHandler(removeItem));
    dispatch(confirmationActions.setOn());
  };
  return (
    <li className={styles.item} ref={lastItem}>
      <div className={styles.title}>{props.name}</div>
      <div className={styles.price}>{`${props.price} PLN`}</div>
      <div className={styles.schoolName}>{props.school.name}</div>
      <div className={styles.actions}>
        <button className={styles.modifyBtn} onClick={modifyInitialHandler}>
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
