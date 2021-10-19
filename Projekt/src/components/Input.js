import { useState, useRef } from 'react';
import styles from './Input.module.css';
const Input = props =>{
    const value = useRef();
    const [moving, setMoving] = useState(false);

    const focusHandler = () =>{
        setMoving(true);
    };
    const onBlurHandler = () =>{
        if(value.current.value.trim() === ''){
            setMoving(false);
            return;
        }
        setMoving(true);
    };
    return (
        <div className={styles.input_container}>
            <label htmlFor={props.id} className={moving ? styles.labelTranstionOff : styles.labelTranstionOn}>{props.children}</label>
            <input type={props.type} id={props.id} className={styles.input} onFocus={focusHandler} onBlur={onBlurHandler} ref={value}/>
        </div>
    );
};

export default Input;