import styles from "./Form.module.css";
import { useState } from "react";
import Input from '../../src/components/Input';
import logoFB from '../image/fb.png';
import logoGP from '../image/gp.png';
import logoTW from '../image/tw.png';

const Form = () =>{
    const [change, setChange] = useState(true);

    const loginMoveHandler = () => {
        setChange(true);
    };
    const registerMoveHandler = () =>{
        setChange(false);
    }
    
    return (
        <div className={styles.image}>
            <div className={styles.container}>
                <div className={styles.nav}>
                    <div id={change ? styles.btnMoveOff : styles.btnMoveOn} className={styles.btn}></div>
                    <button type="button" className={styles.toggle_btn} onClick={loginMoveHandler}>Login</button>
                    <button type="button" className={styles.toggle_btn} onClick={registerMoveHandler}>Reginster</button>
                </div>
                <div className={styles.head}>
                    <img src={logoFB} alt="logoFB"/>
                    <img src={logoTW} alt="logoTW"/>
                    <img src={logoGP} alt="logoGP"/>
                </div>
                <div className={styles.main}>
                   <form id={change ? styles.login : styles.loginOff} className={styles.input_grup}>
                        <Input type="text" id="loginL">Login</Input>
                        <Input type="password" id="passwordL">Hasło</Input>
                        <div className={styles.checbox_input}>
                            <input type="checkbox" className={styles.chech_box}/><span>Remember Password</span>
                        </div>
                        <button type="submit" className={styles.submit_btn}>Submit</button>
                   </form>
                   <form id={change ? styles.register : styles.registerOff} className={styles.input_grup}>
                        <Input type="text" id="loginR">Login</Input>
                        <Input type="email" id="mail">E-Mail</Input>
                        <Input type="password" id="passwordR">Password</Input>
                        <Input type="password" id="check-passwordR">Repeat password</Input>
                        <div className={styles.checbox_input}>
                            <input type="checkbox" className={styles.chech_box}/><span>I agree to the terms</span>
                        </div>
                        <button type="submit" className={styles.submit_btn}>Register</button>
                   </form>
                </div>
            </div>
        </div>
        
    );
}
export default Form;