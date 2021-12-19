import styles from "./Confirmation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { confirmationActions } from "../../storage/confirmation";
import { informationBoxManagerActions } from "../../storage/information-box";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

const Confirmation = (props) => {
  const manager = useSelector((s) => s.confirmation);
  const auth = useSelector((s) => s.autoIndentification);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const turnOff = () => {
    dispatch(confirmationActions.setOff());
  };

  const confirm = async () => {
    setLoading(true);

    try {
      await manager.confirmationHandler(manager.body, auth);
      dispatch(informationBoxManagerActions.toggleVisibility());
      setLoading(false);
      dispatch(confirmationActions.setOff());
    } catch (err) {
      setLoading(false);
      dispatch(
        informationBoxManagerActions.setBox({
          message: "Nie udało sie wykonać akcji z nieznanego powodu.",
          isError: true,
        })
      );
    }
  };
  return (
    <div className={styles.backdrop} onClick={turnOff}>
      {loading && <LoadingSpinner />}
      {!loading && (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.circle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="3rem"
                viewBox="0 0 24 24"
                width="3rem"
                fill="rgb(235, 56, 11)"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
            </div>
            UWAGA
          </div>

          <p className={styles.p}>{manager.message}</p>

          <div className={styles.actions}>
            <button className={styles.cancel} onClick={turnOff}>
              NIE
            </button>
            <div className={styles.confirm} onClick={confirm}>
              TAK
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
