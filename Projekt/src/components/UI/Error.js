import styles from "./Error.module.css";

const Error = () => {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="10rem"
        viewBox="0 0 24 24"
        width="10rem"
        fill="rgb(132, 101, 255)"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      <p className={styles.paragraph}>
        Ojoj Panie Kapitanie, coś poszło nie tak!
      </p>
    </div>
  );
};

export default Error;
