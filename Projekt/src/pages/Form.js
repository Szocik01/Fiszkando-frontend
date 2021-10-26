import styles from "./Form.module.css";
import stylesButton from '../components/buttonShow.module.css';
import {Fragment, useState, useEffect } from "react";
import Input from '../../src/components/Input';
import ButtonShow from '../components/buttonShow';
import testUtils from "react-dom/test-utils";

const Form = () =>{
    const [inputsInfo, setinputsInfo] = useState({loginL: '', passwordL: '', loginR: '', mail: '',passwordR: '', check_passwordR: ''});
    const [button, setButton] = useState({passwordL: false, passwordR: false, check_passwordR: false});
    const [change, setChange] = useState(true);
    const [changePassword, setchangePassword] = useState({buttonPasswordL: false, buttonPasswordR: false, buttoncheck_passwordR: false});
    const [formValid1, setFormValid1] = useState(false);// do poprawy później
    const [formValid2, setFormValid2] = useState(false);// do poprawy później
    const loginMoveHandler = () => {
        setChange(true);
    };
    const registerMoveHandler = () =>{
        setChange(false);
    }
    const passwordHandler = (event) =>{
        for(const key in changePassword){
            if(key===event.target.id){
                setchangePassword((prevState)=>{
                    return {...prevState, [key]: !prevState[key]};
                });
            }
        }
    };
    const formTechnikHandler = event =>{
        for(const key in button){
            if(key===event.target.id){
                if(event.target.value.trim()===''){
                    setButton((prevState)=>{
                        return {...prevState,[key]:false}
                    });
                }else{
                    setButton((prevState)=>{
                        return {...prevState, [key]:true}
                    });
                }
            }
        } 
        for(const key in inputsInfo){
            if(key===event.target.id ){
                setinputsInfo((prevState)=>{
                    return {...prevState, [key]: event.target.value};
                });
            }
        }
    };
    useEffect(()=>{
        if(inputsInfo.loginL.trim()==='' || inputsInfo.passwordL.trim()===''){ // do poprawy później
            setFormValid1(false);
        }if(inputsInfo.loginR.trim()==='' || inputsInfo.mail.trim()===''|| inputsInfo.passwordR.trim()===''|| inputsInfo.check_passwordR.trim()==='' || inputsInfo.passwordR!==inputsInfo.check_passwordR){ // do poprawy później
            setFormValid2(false);
        }if(inputsInfo.loginL.trim()!=='' && inputsInfo.passwordL.trim()!==''){ // do poprawy później
            setFormValid1(true);
        }if(inputsInfo.loginR.trim()!=='' && inputsInfo.mail.trim()!=='' && inputsInfo.passwordR.trim()!=='' && inputsInfo.check_passwordR.trim()!=='' && inputsInfo.passwordR===inputsInfo.check_passwordR){ // do poprawy później
            setFormValid2(true);
        }
        
    },[inputsInfo]);

    const buttonSecend = `${stylesButton.button} ${stylesButton.buttonSecend}`;
    const buttonThird = `${stylesButton.button} ${stylesButton.buttonThird}`;

    const loginSubmitHandler = (event) =>{
        event.preventDefault();
        console.log(inputsInfo.loginL, inputsInfo.passwordL);
    };
    const registerSubmitHandler = (event) =>{
        event.preventDefault();
        console.log(inputsInfo.loginR, inputsInfo.mail, inputsInfo.passwordR, inputsInfo.check_passwordR);
    };
    return (
        <div className={styles.image}>
            <div className={styles.container}>
                <div className={styles.nav}>
                    <div id={change ? styles.btnMoveOff : styles.btnMoveOn} className={styles.btn}></div>
                    <button type="button" className={styles.toggle_btn} onClick={loginMoveHandler}>Login</button>
                    <button type="button" className={styles.toggle_btn} onClick={registerMoveHandler}>Register</button>
                </div>
                <div className={styles.head}>
                </div>
                <div className={styles.main}>
                   <form id={change ? styles.login : styles.loginOff} className={styles.input_grup} onSubmit={loginSubmitHandler}>
                        {button.passwordL ? <ButtonShow type="button" id="buttonPasswordL" onClick={passwordHandler} className={stylesButton.button}>{changePassword.buttonPasswordL ? 'Hide' : 'Show'}</ButtonShow> : ''}
                        <Input type="text" id="loginL" onChange={formTechnikHandler}>Login</Input>
                        <Input  type={changePassword.buttonPasswordL ? 'text' : 'password'} id="passwordL" onChange={formTechnikHandler}>Hasło</Input>
                        <div className={styles.checbox_input}>
                            <input type="checkbox" className={styles.chech_box}/><span>Remember Password</span>
                        </div>
                        <button disabled={!formValid1} type="submit" id="buttonSubmit" className={styles.submit_btn} onChange={formTechnikHandler}>Submit</button>
                   </form>
                   <form id={change ? styles.register : styles.registerOff} className={styles.input_grup} onSubmit={registerSubmitHandler}>
                        {button.passwordR ? <ButtonShow type="button" id="buttonPasswordR" onClick={passwordHandler} className={buttonSecend}>{changePassword.buttonPasswordR ? 'Hide' : 'Show'}</ButtonShow> : ''}
                        {button.check_passwordR ? <ButtonShow type="button" id="buttoncheck_passwordR" onClick={passwordHandler} className={buttonThird}>{changePassword.buttoncheck_passwordR ? 'Hide' : 'Show'}</ButtonShow> : ''}
                        <Input type="text" id="loginR" onChange={formTechnikHandler}>Login</Input>
                        <Input type="email" id="mail" onChange={formTechnikHandler}>E-Mail</Input>
                        <Input type={changePassword.buttonPasswordR ? 'text' : 'password'} id="passwordR" onChange={formTechnikHandler}>Password</Input>
                        <Input type={changePassword.buttoncheck_passwordR ? 'text' : 'password'} id="check_passwordR" onChange={formTechnikHandler}>Repeat password</Input>
                        <div className={styles.checbox_input}>
                            <input type="checkbox" className={styles.chech_box}/><span>I agree to the terms</span>
                        </div>
                        <button disabled={!formValid2} type="submit" id="buttonRegister" className={styles.submit_btn} onChange={formTechnikHandler}>Register</button>
                   </form>
                </div>
            </div>
        </div>
    );
}
export default Form;