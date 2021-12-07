import styles from './FormResetPassword.module.css';
import Input from '../components/formComponents/Input';
import ButtonShow from '../components/formComponents/buttonShow';
import Spiner from '../components/formComponents/Spinner';
import { useEffect, useState } from 'react';

const FormResetPassword = () =>{
    const [inputInfo, setInputInfo] = useState({password: '', repeat_password: ''});
    const [validInput, setValidInput] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validButton, setValidButton] = useState(false);
    const [status, setStatus] = useState();
    const [loadingSpiner, setLoadingSpiner] = useState(false);

    const formTech = (event) =>{
        if(event.target.id==='password'){ // validacja 8 znaków
            if(event.target.value.length < 8){
                setValidInput(true);
            }else{
                setValidInput(false);
            }
        }
        for(const key in inputInfo){ // odczyt z inputów
            if(key===event.target.id){
                setInputInfo((prevState)=>{
                    return {...prevState, [key]: event.target.value};
                })
            }
        }
    }
    useEffect(()=>{
        if(inputInfo.password.length <= 8 || inputInfo.repeat_password.length <= 8 ){ // walidacja na inpucie 8 znaków
            setValidButton(false);
        }if(inputInfo.password.length >= 8 || inputInfo.repeat_password.length >= 8 ){ // walidacja na inpucie 8 znaków
            setValidButton(true);
        }if(inputInfo.password!==inputInfo.repeat_password){ // hasła muszą być takie same
            setValidButton(false);
            setValidPassword(true);
        }if(inputInfo.password===inputInfo.repeat_password){ // hasła muszą być takie same
            setValidPassword(false);
        }
    },[inputInfo]);

    const submitHandler = async (event) =>{
        event.preventDefault();

        const enteredId = 1;
        const enteredPassword= inputInfo.password;
        const enteredpasswordToken= 1;
        // console.log(enteredId, enteredPassword, enteredpasswordToken);
        try{
            setLoadingSpiner(true);
            const res = await fetch('http://localhost:8080/authorize/new-password',
            {
                method: 'POST',
                body: JSON.stringify({
                    uid: enteredId,
                    password: enteredPassword,
                    passwordToken: enteredpasswordToken
                }),
                headers : {
                    "Content-Type": "application/json"
                }
            });
            setStatus(res.status);
            if(res.status===200){
                console.log(res.status);
                console.log("Hasło Zmienione");
            }
        }catch(error){
            console.log(error);
        }
        setLoadingSpiner(false);
    }
    
    return (
        <div className={styles.container}>
            {loadingSpiner ? <Spiner>Loading...</Spiner> : ''}
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
                                    type="password">Hasło
                                </Input>
                            </div>
                            <div className={styles.divForm}>
                                <Input 
                                    className={styles.labelInput}
                                    value={inputInfo.repeat_password}
                                    onChange={formTech}
                                    id="repeat_password" 
                                    type="password">Powtórz Hasło
                                </Input>
                            </div>
                        </div>
                        <div className={styles.validError}>
                            {validInput ? <p className={styles.paragraf}>Hasło musi miec 8 znaków!</p> : ''}
                            {validPassword ? <p className={styles.paragraf}>Hasła są niepoprawne</p> : ''}
                            {status===400 ? <p className={styles.paragraf}>Niepoprawny token lub token wygasł</p> : ''}
                            {status===404 ? <p className={styles.paragraf}>Podany użytkownik nie istnieje</p> : ''}
                        </div>
                        <div className={styles.buttonContainer}>
                            <ButtonShow 
                                disabled={!validButton}
                                type="submit" 
                                id="buttonSubmit" 
                                className={styles.submit_btn}>Zatwierdź
                            </ButtonShow>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormResetPassword;