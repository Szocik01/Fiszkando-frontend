import styles from "./Messages.module.css";
import AddMessage from "./MessagesComponents/AddMessage";

const Messages = () => {
  return (
    <div className={styles.container}>
      <AddMessage />
    </div>
  );
};

export default Messages;
