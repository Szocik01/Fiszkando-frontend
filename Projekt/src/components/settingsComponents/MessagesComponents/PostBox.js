import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import EmailItem from "./EmailItem";

import styles from "./styles/PostBox.module.css";

const PostBox = (props) => {
  const auth = useSelector((state) => state.autoIndentification);
  const [messages, setMessages] = useState([]);
  const [messagesToDelete, setMessagesToDelete] = useState([]);

  const setMessageToDeleteHandler = (id) =>
    setMessagesToDelete((p) => {
      const idIndex = p.findIndex((i) => i.toString() === id.toString());
      if (idIndex < 0) {
        return [...p, id];
      } else {
        const filteredIndexes = p.filter((i) => i.toString() !== id.toString());
        return filteredIndexes;
      }
    });

  const fetchPostBoxHandler = useCallback(async () => {
    const res = await fetch("http://localhost:8080/get-all-messages", {
      method: "POST",
      body: JSON.stringify({ uid: auth.uid }),
      headers: {
        uid: auth.uid,
        token: auth.token,
        remeberMe: auth.remeberMe,
        "Content-Type": "application/json",
      },
    });

    const parsRes = await res.json();
    console.log(parsRes);
    setMessages(parsRes);
  }, [auth]);

  const readMessageHandler = async (id) => {
    const messIndex = messages.findIndex(
      (m) => m._id.toString() === id.toString()
    );

    if (messages[messIndex].readed) {
      return;
    }

    const res = await fetch("http://localhost:8080/email-readed", {
      method: "POST",
      body: JSON.stringify({ _id: id }),
      headers: {
        uid: auth.uid,
        token: auth.token,
        remeberMe: auth.remeberMe,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      messages[messIndex].readed = true;
    }
  };

  const delteMessagesHandler = async () => {
    const res = await fetch("http://localhost:8080/delete-messages", {
      method: "POST",
      body: JSON.stringify({ _ids: messagesToDelete }),
      headers: {
        uid: auth.uid,
        token: auth.token,
        remeberMe: auth.remeberMe,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      // let db = messages;
      // for (const id of messagesToDelete) {
      //   const filteredTMP = db.filter((i) => i._id !== id);
      //   db = filteredTMP;
      // }
      // setMessages(db);
      fetchPostBoxHandler();
    }
  };

  useEffect(() => {
    fetchPostBoxHandler();
  }, [fetchPostBoxHandler]);

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div
          className={`${styles.deleteBtn} ${
            messagesToDelete.length && styles["deleteBtn--active"]
          }`}
          onClick={messagesToDelete.length ? delteMessagesHandler : () => {}}
        >
          Usuń
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </div>
      </div>
      <ul>
        {messages.map((m) => (
          <EmailItem
            wholeMsg={m}
            topic={m.topic}
            author={m.from}
            key={m._id}
            id={m._id}
            readed={m.readed}
            showMessgaeBox={props.showMessageHandler}
            chooseMessageHandler={props.chooseMessageHandler}
            setMessagesToDelete={setMessageToDeleteHandler}
            readMessageHandler={readMessageHandler}
          />
        ))}
      </ul>
      <button className={styles.addBtn} onClick={props.showAddMessageHandler}>
        +
      </button>
    </div>
  );
};

export default PostBox;
