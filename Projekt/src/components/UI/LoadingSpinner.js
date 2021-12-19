import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.element} />
      <div className={styles.element2} />
      <div className={styles.element3} />
    </div>
  );
};

export default LoadingSpinner;
