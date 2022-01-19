import styles from "../../../pages/FormResetPassword.module.css";
import Input from "../../formComponents/Input";
import ButtonShow from "../../formComponents/ButtonShow";
import Spiner from "../../formComponents/Spinner";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import informationBoxManager from "../../../storage/information-box";

export default function PasswordChange() {
  const auth = useSelector((state) => state.autoIndentification);
  const dispatch = useDispatch();
  const [inputInfo, setInputInfo] = useState({
    password: "",
    repeat_password: "",
  });
  const [validInput, setValidInput] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validButton, setValidButton] = useState(false);
  const [status, setStatus] = useState();
  const [loadingSpiner, setLoadingSpiner] = useState(false);

  const formTech = (event) => {
    if (event.target.id === "password") {
      // validacja 8 znaków
      if (event.target.value.length < 8) {
        setValidInput(true);
      } else {
        setValidInput(false);
      }
    }
    for (const key in inputInfo) {
      // odczyt z inputów
      if (key === event.target.id) {
        setInputInfo((prevState) => {
          return { ...prevState, [key]: event.target.value };
        });
      }
    }
  };

  const funkcja = useCallback(async () => {
    try {
      console.log(auth.token);
      const response = await fetch(
        "http://localhost:8080/authorize/check-token",
        {
          method: "POST",
          body: JSON.stringify({
            _id: auth.UID,
            token: auth.token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("poprawne tokeny");
      } else {
        console.log("nieporapwne Tokeny");
      }
    } catch (e) {
      console.error(e);
    }
  }, [auth.UID, auth.token]);
  useEffect(() => {
    funkcja();
  }, [funkcja]);

  useEffect(() => {
    if (
      inputInfo.password.length <= 8 ||
      inputInfo.repeat_password.length <= 8
    ) {
      // walidacja na inpucie 8 znaków
      setValidButton(false);
    }
    if (
      inputInfo.password.length >= 8 ||
      inputInfo.repeat_password.length >= 8
    ) {
      // walidacja na inpucie 8 znaków
      setValidButton(true);
    }
    if (inputInfo.password !== inputInfo.repeat_password) {
      // hasła muszą być takie same
      setValidButton(false);
      setValidPassword(true);
    }
    if (inputInfo.password === inputInfo.repeat_password) {
      // hasła muszą być takie same
      setValidPassword(false);
    }
  }, [inputInfo]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoadingSpiner(true);
      const res = await fetch("http://localhost:8080/authorize/new-password", {
        method: "POST",
        body: JSON.stringify({
          uid: auth.uid,
          token: auth.token,
          remeberMe: auth.remeberMe,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStatus(res.status);
      dispatch(informationBoxManager.actions.toggleVisibility());
      if (res.status === 202) {
        console.log("Hasło Zmienione");
        dispatch(
          informationBoxManager.actions.setBox({
            message: "Hasło zostało zmienione!",
            isError: true,
          })
        );
      } else {
        console.log("Hasło nie zostało zmienione");
        dispatch(
          informationBoxManager.actions.setBox({
            message: "Hasło nie zostało zmienione!",
            isError: true,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingSpiner(false);
  };

  return (
    <div className={styles.container_Settings}>
      {loadingSpiner ? <Spiner>Loading...</Spiner> : ""}
      <div className={styles.container_all}>
        <div className={styles.paragraf_h1}>
          <h1>Ustaw nowe hasło</h1>
        </div>
        <div className={styles.container_inputs}>
          <form onSubmit={submitHandler}>
            <div className={styles.inputContainer}>
              <div className={styles.divForm}>
                <Input
                  className={styles.labelInput}
                  onChange={formTech}
                  value={inputInfo.password}
                  id="password"
                  type="password"
                >
                  Hasło
                </Input>
              </div>
              <div className={styles.divForm}>
                <Input
                  className={styles.labelInput}
                  value={inputInfo.repeat_password}
                  onChange={formTech}
                  id="repeat_password"
                  type="password"
                >
                  Powtórz Hasło
                </Input>
              </div>
            </div>
            <div className={styles.validError}>
              {validInput ? (
                <p className={styles.paragraf}>Hasło musi miec 8 znaków!</p>
              ) : (
                ""
              )}
              {validPassword ? (
                <p className={styles.paragraf}>Hasła są niepoprawne</p>
              ) : (
                ""
              )}
              {status === 400 ? (
                <p className={styles.paragraf}>
                  Niepoprawny token lub token wygasł
                </p>
              ) : (
                ""
              )}
              {status === 404 ? (
                <p className={styles.paragraf}>
                  Podany użytkownik nie istnieje
                </p>
              ) : (
                ""
              )}
            </div>
            <div className={styles.buttonContainer}>
              <ButtonShow
                disabled={!validButton}
                type="submit"
                id="buttonSubmit"
                className={styles.submit_btn}
              >
                Zatwierdź
              </ButtonShow>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
