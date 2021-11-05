import styles from "./Form.module.css";
import stylesButton from '../components/formComponents/buttonShow.module.css';
import {Fragment, useState, useEffect } from "react";
import Input from '../components/formComponents/Input';
import ButtonShow from '../components/formComponents/buttonShow';
import testUtils from "react-dom/test-utils";

const Form = () =>{
    const [inputsInfo, setinputsInfo] = useState({mailL: '', passwordL: '', loginR: '', mail: '',passwordR: '', check_passwordR: ''});
    const [formValid1, setFormValid1] = useState(false);// do poprawy później
    const [formValid2, setFormValid2] = useState(false);// do poprawy później
    const [repetPassword, setRepetPassword] = useState(false); //sprawdzenie haseł, czy są takie same
    const [buttonShow, setButtonShow] = useState({passwordL: false, passwordR: false, check_passwordR: false});// do poprawy później
    const [validatorInputs, setValidatorInputs] = useState({
        mailL: false, 
        passwordL: false, 
        loginR: false, 
        mail: false, 
        passwordR: false, 
        check_passwordR: false, 
        buttonPasswordL: false, 
        buttonPasswordR: false, 
        buttoncheck_passwordR: false, 
        rememberPassword: false, 
        changePassword: false,
        loginMove: true
    });
    const formTechnikHandler = event =>{
        for(const key in validatorInputs){
            if(key===event.target.id){
                if(key==='passwordL' || key==='passwordR' || key==='check_passwordR'){ //validacja długości znaków
                    if(event.target.value.length < 8){
                        setValidatorInputs((prevState)=>{
                            return {...prevState, [key]:true}
                        });
                    }
                    else{
                        setValidatorInputs((prevState)=>{
                            return {...prevState, [key]:false}
                        });
                    }
                }if(key==='passwordL' || key==='passwordR' || key==='check_passwordR'){// pokazywanie przycisków
                    if(event.target.value.trim()===''){ 
                        setButtonShow((prevState)=>{
                            return {...prevState,[key]:false}
                        });
                    }else{
                        setButtonShow((prevState)=>{
                            return {...prevState, [key]:true}
                        });
                    }
                }if(key==='mailL' || key==='mail'){ //validacja znaku "@"
                    if(event.target.value.includes('@')){
                        setValidatorInputs((prevState)=>{
                            return {...prevState, [key]:false}
                        });
                    }else{
                        setValidatorInputs((prevState)=>{
                            return {...prevState, [key]:true}
                        });
                    }
                }if(key==='buttonPasswordL' || key==='buttonPasswordR' || key==='buttoncheck_passwordR'){ // zmienianie wartości z text na password
                    setValidatorInputs((prevState)=>{
                        return {...prevState, [key]: !prevState[key]};
                    });
                }if(key==='loginMove'){ // animacja przycisku LOGIN/REJESTRACJA
                    setValidatorInputs((prevState)=>{
                        return {...prevState, [key]:!prevState[key]};
                    })
                }if(key==='rememberPassword'){ // sprawdzanie checboxów
                    setValidatorInputs((prevState)=>{
                        return {...prevState, [key]:!prevState[key]}
                    });
                }
                setinputsInfo((prevState)=>{//powoduje wypisanie znaków
                    return {...prevState, [key]: event.target.value};
                });
            }
        }
    };

    useEffect(()=>{
        const validFormOne = inputsInfo.mailL.trim()==='' || inputsInfo.passwordL.trim()==='' || inputsInfo.passwordL.length < 8;
        const validFormTwo = inputsInfo.mailL.trim()!=='' && inputsInfo.passwordL.trim()!=='' && inputsInfo.passwordL.length >= 8;
        const validFormThree = inputsInfo.loginR.trim()==='' || inputsInfo.mail.trim()===''|| inputsInfo.passwordR.trim()===''|| inputsInfo.passwordR.length < 8 || inputsInfo.check_passwordR.trim()==='' || inputsInfo.passwordR!==inputsInfo.check_passwordR;
        const validFormFour = inputsInfo.loginR.trim()!=='' && inputsInfo.mail.trim()!=='' && inputsInfo.passwordR.trim()!=='' && inputsInfo.passwordR.length >= 8 && inputsInfo.check_passwordR.trim()!=='' && inputsInfo.passwordR===inputsInfo.check_passwordR;
        if(validFormOne){ // do poprawy później
            setFormValid1(false);
        }if(validFormThree){ // do poprawy później
            setFormValid2(false);
        }if(validFormTwo){ // do poprawy później
            setFormValid1(true);
        }if(validFormFour){ // do poprawy później
            setFormValid2(true);
        }if(inputsInfo.passwordR!==inputsInfo.check_passwordR){ //walidacja do sprawdzenia, czy są poprawne hasła z sobą!
            setRepetPassword(true);
        }else{
            setRepetPassword(false);
        }
  
    },[inputsInfo]);

    const buttonSecend = `${stylesButton.button} ${stylesButton.buttonSecend}`;
    const buttonThird = `${stylesButton.button} ${stylesButton.buttonThird}`;

    const loginSubmitHandler = (event) =>{
        event.preventDefault();
        const enteredMail = inputsInfo.mailL;
        const enteredPassword = inputsInfo.passwordL;
        const rememberPassword = validatorInputs.rememberPassword;
        console.log(enteredMail, enteredPassword, rememberPassword);

        fetch('http://localhost:8080/login',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredMail,
                    password: enteredPassword,
                    rememberMe: rememberPassword
                }),
                headers : {
                    "Content-Type": "application/json"
                }
            }
        ).then(res =>{
            console.log(res);
            if(res.status===200){
                console.log('Dane są poprawne!');
            }else if(res.status===400){
                console.log('Hasła są różne');
            }else if(res.status===404){
                console.log('Nie znaleziono uzytkownika z podanym adresem mailowym');
            }else{
                console.log('Cos sie odjebalo chuj wie co');
            }
        }).catch(error=>{
            console.log(error);
        });

    };
    const registerSubmitHandler = async (event) =>{
        event.preventDefault();
        const enteredLogin = inputsInfo.loginR
        const enteredMail = inputsInfo.mail;
        const enteredPassword = inputsInfo.passwordR;
        const enteredPasswordRepat = inputsInfo.check_passwordR;
        console.log(enteredLogin, enteredMail, enteredPassword, enteredPasswordRepat);

        try{
            const res = await fetch('http://localhost:8080/register',
            {
                method: 'POST',
                body: JSON.stringify({
                    username: enteredLogin,
                    email: enteredMail,
                    password: enteredPassword,
                    // repate: enteredPasswordRepat
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(res.status===201){
                console.log('Utworzono nowego uzytkownika');
                console.log(res);
            }else if(res.status===400){
                console.log('Niepopprawne dane wyslane z frontendu');
            }else if(res.status===403){
                console.log('Email juz istnieje');
            }else{
                console.log('Chuj wie co sie odjebalo w mongodb ale nie udalo sie utworzyc usera');
            }
        }catch(error){
            console.log(error);
        }
        
    };
    return (
        <div className={styles.image}>
            <div className={styles.container}>
                <div className={styles.nav}>
                    <div id={validatorInputs.loginMove ? styles.btnMoveOff : styles.btnMoveOn} className={styles.btn}></div>
                    <div className={styles.navCenter}>
                        <button type="button" id="loginMove" className={validatorInputs.loginMove ? `${styles.toggle_btn} ${styles.toggle_btnColor1}` : `${styles.toggle_btn} `} onClick={formTechnikHandler}>Login</button>
                    </div>
                    <div className={styles.navCenter}>
                        <button type="button" id="loginMove" className={validatorInputs.loginMove ? styles.toggle_btn : `${styles.toggle_btn} ${styles.toggle_btnColor1}`} onClick={formTechnikHandler}>Register</button></div>
                </div>
                <div className={styles.main}>
                   <form id={validatorInputs.loginMove ? styles.login : styles.loginOff} className={styles.input_grup} onSubmit={loginSubmitHandler}>
                       <div className={styles.inputAndButton}>
                        {buttonShow.passwordL ? <ButtonShow 
                                type="button" 
                                id="buttonPasswordL" 
                                onClick={formTechnikHandler} 
                                className={stylesButton.button}>
                                {validatorInputs.buttonPasswordL ? 'Hide' : 'Show'}
                            </ButtonShow> : ''}
                            <Input 
                                type="email" 
                                id="mailL" 
                                onChange={formTechnikHandler}
                                >E-mail
                            </Input>
                       </div>
                        {validatorInputs.mailL ? <p className={styles.paragraf}>Proszę wpisać poprawny adres</p> : ''}
                        <Input  
                            type={validatorInputs.buttonPasswordL ? 'text' : 'password'} 
                            id="passwordL" 
                            onChange={formTechnikHandler}>Hasło
                        </Input>
                        {validatorInputs.passwordL ? <p className={styles.paragraf}>Długość Hasła musi miec minimum 8 znaków!</p> : ''}
                        <div className={styles.checbox_input}>
                            <input 
                                type="checkbox" 
                                className={styles.chech_box} 
                                id="rememberPassword" 
                                onChange={formTechnikHandler}
                            />
                            <span>Remember Password</span>
                        </div>
                        <button 
                            disabled={!formValid1} 
                            type="submit" 
                            id="buttonSubmit"
                            className={styles.submit_btn} 
                            onChange={formTechnikHandler}>Submit
                        </button>
                   </form>
                   <form id={validatorInputs.loginMove ? styles.register : styles.registerOff} className={styles.input_grup} onSubmit={registerSubmitHandler}>
                        <Input 
                            type="text" 
                            id="loginR" 
                            onChange={formTechnikHandler}>Login
                        </Input>
                        <Input 
                            type="email" 
                            id="mail" 
                            onChange={formTechnikHandler}>E-Mail
                        </Input>
                        {validatorInputs.mail ? <p className={styles.paragraf}>Proszę wpisać poprawny adres</p> : ''}
                        <div className={styles.inputAndButton}>
                            {buttonShow.passwordR ? <ButtonShow 
                                type="button" 
                                id="buttonPasswordR" 
                                onClick={formTechnikHandler} 
                                className={buttonSecend}>{validatorInputs.buttonPasswordR ? 'Hide' : 'Show'}
                            </ButtonShow> : ''}
                            <Input 
                                type={validatorInputs.buttonPasswordR ? 'text' : 'password'} 
                                id="passwordR" 
                                onChange={formTechnikHandler}>Password
                            </Input>
                        </div>
                        {validatorInputs.passwordR ? <p className={styles.paragraf}>Długość Hasła musi miec minimum 8 znaków!</p> : ''}
                        <div className={styles.inputAndButton}>
                            {buttonShow.check_passwordR ? <ButtonShow 
                                type="button" 
                                id="buttoncheck_passwordR" 
                                onClick={formTechnikHandler} 
                                className={buttonThird}>{validatorInputs.buttoncheck_passwordR ? 'Hide' : 'Show'}
                            </ButtonShow> : ''}
                            <Input 
                                type={validatorInputs.buttoncheck_passwordR ? 'text' : 'password'} 
                                id="check_passwordR" 
                                onChange={formTechnikHandler}>Repeat password
                            </Input>
                        </div>
                        {repetPassword ? <p className={styles.paragraf}>Hasła są niepoprawne</p> : ''}
                        <div className={styles.checbox_input}>
                            <input 
                            type="checkbox" 
                            className={styles.chech_box} 
                            id="changePassword" 
                            onChange={formTechnikHandler}
                            />
                            <span>I agree to the terms</span>
                        </div>
                        <button 
                            disabled={!formValid2} 
                            type="submit" 
                            id="buttonRegister" 
                            className={styles.submit_btn} 
                            onChange={formTechnikHandler}>Register
                        </button>
                   </form>
                </div>
            </div>
        </div>
    );
}
export default Form;