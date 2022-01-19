import { useState } from "react";
import styles from "./Messages.module.css";
import AddMessage from "./MessagesComponents/AddMessage";
import MessageBox from "./MessagesComponents/MessageBox";
import PostBox from "./MessagesComponents/PostBox";

const Messages = () => {
  const [showAddMessage, setShowAddMessage] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});

  const toggleAddMessageVisibility = () => setShowAddMessage((p) => !p);
  const toggleMessageVisibility = () => setShowMessage((p) => !p);
  const chooseMessageHandler = (msg) => {
    setCurrentMessage(msg);
  };
  return (
    <div className={styles.container}>
      <PostBox
        showAddMessageHandler={toggleAddMessageVisibility}
        showMessageHandler={toggleMessageVisibility}
        chooseMessageHandler={chooseMessageHandler}
      />
      <AddMessage
        isMoved={showAddMessage}
        showHandler={toggleAddMessageVisibility}
      />
      <MessageBox
        isMoved={showMessage}
        showHandler={toggleMessageVisibility}
        data={currentMessage}
      />
    </div>
  );
};

export default Messages;
