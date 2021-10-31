import { useState, useRef } from 'react';
import styles from './Input.module.css';
const Input = props =>{
    const value = useRef();
    const [moving, setMoving] = useState(false);
    const [inputValide, setInputValide] = useState(true);

    const focusHandler = () =>{
        setMoving(true);
        setInputValide(true);
    };
    const onBlurHandler = () =>{
        if(value.current.value.trim() === ''){
            setMoving(false);
            setInputValide(false);
            return;
        }
        // setMoving(true);
        // setInputValide(true);
    };
    return (
        <div className={styles.input_container}>
            <label htmlFor={props.id} className={`${moving ? styles.labelTranstionOff : styles.labelTranstionOn} ${inputValide ? '' : styles.labelValid}`}>{props.children}</label>
            <input type={props.type} id={props.id} onChange={props.onChange} className={inputValide ? styles.input : styles.inputValide} onFocus={focusHandler} onBlur={onBlurHandler} ref={value}/>
        </div>
    );
};

export default Input;