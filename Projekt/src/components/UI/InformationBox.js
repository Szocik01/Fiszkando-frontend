import styles from "./InformationBox.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import informationBoxManager from "../../storage/information-box";

const InformationBox = (props) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const HidenHandler = () => {
    setShow(false);
  };

  useEffect(() => {
    if (!props.show) {
      return;
    }
    setShow(true);
    setTimeout(function () {
      setShow(false);
      dispatch(informationBoxManager.actions.toggleVisibility());
    }, 5000);
  }, [props.show]);
  return (
    <div>
      {show ? (
        <div className={styles.container}>
          <div
            className={`${styles.main} ${props.isError && styles.mainError}`}
          >
            <div className={styles.container_paragraf}>
              <p className={styles.paragraf}>{props.children}</p>
            </div>
            <div className={styles.container_button}>
              <svg
                onClick={HidenHandler}
                className={styles.button}
                xmlns="http://www.w3.org/2000/svg"
                height="2rem"
                viewBox="0 0 24 24"
                width="2rem"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InformationBox;
