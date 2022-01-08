import styles from "./styles/CurrentPermissions.module.css";

const CurrentPermissions = (props) => {
  return (
    <div className={styles.container}>
      {!props.isSelected && <h1>Nie wybrano użytkownika.</h1>}
      {props.isSelected && (
        <ul>
          <li></li>
        </ul>
      )}
    </div>
  );
};

export default CurrentPermissions;
