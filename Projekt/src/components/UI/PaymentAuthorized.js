import styles from "./PaymentAuthorized.module.css";

const PaymentAuthorized = () => {
  return (
    <div className={styles.container}>
      <div className={styles.rounded}>
        <div className={styles.firstArm}></div>
        <div className={styles.secondArm}></div>
      </div>
    </div>
  );
};

export default PaymentAuthorized;
