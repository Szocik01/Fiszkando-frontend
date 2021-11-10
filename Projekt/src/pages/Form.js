import styles from "./Form.module.css";
import stylesButton from '../components/formComponents/buttonShow.module.css';
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Input from '../components/formComponents/Input';
import InputChexBox from '../components/formComponents/InputChexbox';
import Spiner from "../components/formComponents/Spinner";
import ButtonShow from '../components/formComponents/buttonShow';
import { Authoindenty } from '../storage/redux-index'

const Form = () =>{
    const [inputsInfo, setinputsInfo] = useState({mailL: '', passwordL: '', loginR: '', mail: '',passwordR: '', check_passwordR: ''});
    const [formValid1, setFormValid1] = useState(false);// do poprawy później
    const [formValid2, setFormValid2] = useState(false);// do poprawy później
    const [status400, setStatus400] = useState(false); //statusy od serwera
    const [status403, setStatus403] = useState(false); //statusy od serwera
    const [status404, setStatus404] = useState(false); //statusy od serwera
    const [status500, setStatus500] = useState(false); //statusy od serwera
    const [repetPassword, setRepetPassword] = useState(false); //sprawdzenie haseł, czy są takie same
    const [buttonShow, setButtonShow] = useState({passwordL: false, passwordR: false, check_passwordR: false});
    const [loadingSpiner, setLoadingSpiner] = useState(false);
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
    const dispatch = useDispatch();

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

    const loginSubmitHandler = async (event) =>{
        event.preventDefault();
        const enteredMail = inputsInfo.mailL;
        const enteredPassword = inputsInfo.passwordL;
        const rememberPassword = validatorInputs.rememberPassword;
        console.log(enteredMail, enteredPassword, rememberPassword);
        try{
            setLoadingSpiner(true);
            const res = await fetch('http://localhost:8080/login',
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
            });
            const tokken = await res.json();
            if(res.status===200){
                console.log('Dane są poprawne!');
                console.log(tokken);
                dispatch(Authoindenty.IndetificationShow({
                    uid: tokken.auth.UID,
                    token: tokken.auth.token.token,
                    rememberToken: tokken.auth.token.rememberMeToken,
                    expire: tokken.auth.token.expire
                }));
                // document.cookie = `token=${tokken.auth.token.token}`;
                setStatus400(false);
                setStatus404(false);
                
            }else if(res.status===400){
                console.log('Hasła są różne');
                setStatus400(true);
            }else if(res.status===404){
                console.log('Nie znaleziono uzytkownika z podanym adresem mailowym');
                setStatus404(true);
            }else{
                setStatus500(true);
                console.log('Cos sie odjebalo chuj wie co');
            }
        }catch(error){
            console.log(error);
        }
        setLoadingSpiner(false);

    };
    const registerSubmitHandler = async (event) =>{
        event.preventDefault();
        const enteredLogin = inputsInfo.loginR
        const enteredMail = inputsInfo.mail;
        const enteredPassword = inputsInfo.passwordR;
        const enteredPasswordRepat = inputsInfo.check_passwordR;
        console.log(enteredLogin, enteredMail, enteredPassword, enteredPasswordRepat);

        try{
            setLoadingSpiner(true);
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
                setStatus403(false);
            }else if(res.status===400){
                setStatus500(true);
                console.log('Niepopprawne dane wyslane z frontendu');
            }else if(res.status===403){
                console.log('Email juz istnieje');
                setStatus403(true);
            }else{
                setStatus500(true);
                console.log('Chuj wie co sie odjebalo w mongodb ale nie udalo sie utworzyc usera');
            }
        }catch(error){
            console.log(error);
        }
        setLoadingSpiner(false);
        
    };
    return (
        <div className={styles.image}>
            {loadingSpiner ? <Spiner>{validatorInputs.loginMove ? "Loading..." : "Register..."}</Spiner>: ''}
            <div className={styles.container}>
                <div className={styles.nav}>
                    <div id={validatorInputs.loginMove ? styles.btnMoveOff : styles.btnMoveOn} className={styles.btn}></div>
                    <div className={styles.navCenter}>
                        <button type="button" id="loginMove" className={validatorInputs.loginMove ? `${styles.toggle_btn} ${styles.toggle_btnColor1}` : `${styles.toggle_btn} `} onClick={formTechnikHandler}>Login</button>
                    </div>
                    <div className={styles.navCenter}>
                        <button type="button" id="loginMove" className={validatorInputs.loginMove ? styles.toggle_btn : `${styles.toggle_btn} ${styles.toggle_btnColor1}`} onClick={formTechnikHandler}>Register</button>
                    </div>
                </div>
                <div className={styles.main}>
                   <form id={validatorInputs.loginMove ? styles.login : styles.loginOff} className={styles.input_grup} onSubmit={loginSubmitHandler}>
                        <Input 
                                type="email" 
                            id="mailL" 
                            onChange={formTechnikHandler}
                            >E-mail
                        </Input>
                        {validatorInputs.mailL ? <p className={styles.paragraf}>Proszę wpisać poprawny adres</p> : ''}
                        {status404 ? <p className={styles.paragraf}>Nie znaleźono użytkownika z takim E-mailem!</p> : ''}
                        <div className={styles.inputAndButton}>
                            {buttonShow.passwordL ? <ButtonShow 
                                type="button" 
                                id="buttonPasswordL" 
                                onClick={formTechnikHandler} 
                                className={stylesButton.button}>
                                {validatorInputs.buttonPasswordL ? 'Hide' : 'Show'}
                            </ButtonShow> : ''}
                            <Input  
                                type={validatorInputs.buttonPasswordL ? 'text' : 'password'} 
                                id="passwordL" 
                                onChange={formTechnikHandler}>Hasło
                            </Input>
                        </div>
                        {validatorInputs.passwordL ? <p className={styles.paragraf}>Długość Hasła musi miec minimum 8 znaków!</p> : ''}
                        {status400 ? <p className={styles.paragraf}>Nie poprawne hasło!</p> : ''}
                        <div className={styles.checbox_input}>
                            <InputChexBox 
                                type="checkbox" 
                                className={styles.chech_box} 
                                id="rememberPassword" 
                                onChange={formTechnikHandler}>Remember Password
                            </InputChexBox>
                        </div>
                        <div className={styles.stopka}>
                            {status500 ? <p className={`${styles.paragraf} ${styles.paragrafadd}`}>Coś poszło nie tak, przaepraszamy za niedogodności, proszę spróbować później.</p>: ''}
                            <ButtonShow 
                                disabled={!formValid1} 
                                type="submit" 
                                id="buttonSubmit"
                                className={styles.submit_btn} 
                                onChange={formTechnikHandler}>Submit
                            </ButtonShow>
                        </div>
                   </form>
                </div>
                <div className={`${styles.main} ${styles.mainSeccend}`}>
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
                        {status403 ? <p className={styles.paragraf}>Taki E-mail już istnieje!</p> : ''}
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
                            <InputChexBox 
                                type="checkbox" 
                                className={styles.chech_box} 
                                id="changePassword" 
                                onChange={formTechnikHandler}>I agree to the terms
                            </InputChexBox>
                        </div>
                        <div className={`${styles.stopka} ${styles.stopka1}`}>
                            {status500 ? <p className={`${styles.paragraf} ${styles.paragrafadd}`}>Coś poszło nie tak, przaepraszamy za niedogodności, proszę spróbować później.</p>: ''}
                            <ButtonShow 
                                disabled={!formValid2} 
                                type="submit" 
                                id="buttonRegister" 
                                className={styles.submit_btn} 
                                onChange={formTechnikHandler}>Register
                            </ButtonShow>
                        </div>
                   </form>
                </div>
            </div>
        </div>
    );
}
export default Form;