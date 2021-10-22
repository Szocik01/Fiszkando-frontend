import styles from "./Form.module.css";
import stylesButton from '../components/buttonShow.module.css';
import {Fragment, useState, useEffect } from "react";
import Input from '../../src/components/Input';
import logoFB from '../image/fb.png';
import logoGP from '../image/gp.png';
import logoTW from '../image/tw.png';
import ButtonShow from '../components/buttonShow';

const Form = () =>{
    const [inputsInfo, setinputsInfo] = useState({loginL: '', passwordL: '', loginR: '', mail: '',passwordR: '', check_passwordR: ''});
    const [button, setButton] = useState({passwordL: false, passwordR: false, check_passwordR: false});
    const [change, setChange] = useState(true);
    const [changePassword, setchangePassword] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const loginMoveHandler = () => {
        setChange(true);
    };
    const registerMoveHandler = () =>{
        setChange(false);
    }
    const passwordHandler = () =>{
        setchangePassword((prevState)=>{
            return !prevState;
        });
    };
    const formTechnikHandler = event =>{
        for(const key in button){
            if(key===event.target.id){
                if(event.target.value.trim()===''){
                    console.log(key)
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
        if(inputsInfo.loginL.trim()==='' || inputsInfo.passwordL.trim()===''){
            setFormValid(false);
        }
        // if(inputsInfo.loginR.trim()==='' || inputsInfo.mail.trim()===''|| inputsInfo.passwordR.trim()===''|| inputsInfo.check_passwordR.trim()===''){
        //     setFormValid(false);
        // }
        else{
            setFormValid(true);
        }
    },[inputsInfo]);

    const buttonSecend = `${stylesButton.button} ${stylesButton.buttonSecend}`;
    const buttonThird = `${stylesButton.button} ${stylesButton.buttonThird}`;

    const loginSubmitHandler = (event) =>{
        event.preventDefault();
    };
    const registerSubmitHandler = (event) =>{
        event.preventDefault();
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
                    <img src={logoFB} alt="logoFB"/>
                    <img src={logoTW} alt="logoTW"/>
                    <img src={logoGP} alt="logoGP"/>
                </div>
                <div className={styles.main}>
                   <form id={change ? styles.login : styles.loginOff} className={styles.input_grup} onSubmit={loginSubmitHandler}>
                        {button.passwordL ? <ButtonShow type="button" onClick={passwordHandler} className={stylesButton.button}>Show</ButtonShow> : ''}
                        <Input type="text" id="loginL" onChange={formTechnikHandler}>Login</Input>
                        <Input  type={changePassword ? 'text' : 'password'} id="passwordL" onChange={formTechnikHandler}>Hasło</Input>
                        <div className={styles.checbox_input}>
                            <input type="checkbox" className={styles.chech_box}/><span>Remember Password</span>
                        </div>
                        <button disabled={!formValid} type="submit" className={styles.submit_btn}>Submit</button>
                   </form>
                   <form id={change ? styles.register : styles.registerOff} className={styles.input_grup} onSubmit={registerSubmitHandler}>
                        {button.passwordR ? <ButtonShow type="button" onClick={passwordHandler} className={buttonSecend}>Show</ButtonShow> : ''}
                        {button.check_passwordR ? <ButtonShow type="button" onClick={passwordHandler} className={buttonThird}>Show</ButtonShow> : ''}
                        <Input type="text" id="loginR" onChange={formTechnikHandler}>Login</Input>
                        <Input type="email" id="mail" onChange={formTechnikHandler}>E-Mail</Input>
                        <Input type={changePassword ? 'text' : 'password'} id="passwordR" onChange={formTechnikHandler}>Password</Input>
                        <Input type={changePassword ? 'text' : 'password'} id="check_passwordR" onChange={formTechnikHandler}>Repeat password</Input>
                        <div className={styles.checbox_input}>
                            <input type="checkbox" className={styles.chech_box}/><span>I agree to the terms</span>
                        </div>
                        <button disabled={!formValid} type="submit" className={styles.submit_btn}>Register</button>
                   </form>
                </div>
            </div>
        </div>
    );
}
export default Form;