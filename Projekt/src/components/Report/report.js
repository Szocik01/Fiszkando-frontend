import styles from './report.module.css';
import { useRef, useState } from 'react';
import InputChexBox from './inputCheckBox';
import { useSelector } from 'react-redux';

const Report = (props) =>{
    const auth = useSelector((state) => state.autoIndentification);
    const ref = useRef();
    const [onArea, setOnArea] = useState(false);
    const [info, setInfo] = useState('');

    const closeHandler = (event) =>{
        if(event.target===ref.current){
            props.reporthandler();
        }
    }
    const areaTextHandler = () =>{
        setOnArea(p=>!p)
    };
    const fetchhandler = (value) =>{ 
        setInfo(value);
    };
    const textAreaHandler = (event) =>{
        setInfo(event.target.value);
    }

    const submitHandler = async (event) =>{
        event.preventDefault();
        const finalObj = {};
            finalObj.message = info;
            finalObj.topic = `${props.information.courseId} - ${props.information._id}`
            finalObj.to = 'artek.scibor@gmail.com';
            finalObj.toAdmins = true;
            finalObj.from = auth.uid;
            console.log(finalObj);
        const res = await fetch("http://localhost:8080/send-email", {
        method: "POST",
        body: JSON.stringify(finalObj),
        headers: {
            uid: auth.uid,
            token: auth.token,
            remeberMe: auth.remeberMe,
            "Content-Type": "application/json",
            },
        });
        console.log(res.ok);
    }
    return (
        <div className={styles.container} onClick={closeHandler} ref={ref}>
            <div className={styles.main}>
                <div className={styles.main_title}>
                    <p>Jaki masz kurwa problem cwelu jeden?</p>
                </div>
                <div className={styles.main_inputs}> 
                    <InputChexBox value={fetchhandler}>Jedna z poprawnych odpowiedzi jest niepoprawna </InputChexBox>
                    <InputChexBox value={fetchhandler}>Pytanie jest źle z sformułowane</InputChexBox>
                    <InputChexBox value={fetchhandler}>Obrazki zawierają niemoralne treści</InputChexBox>
                    <InputChexBox value={fetchhandler}>Obrazki są słabej jakości</InputChexBox>
                    <div className={styles.main_input_checkArea}>
                        <input type="radio" name="drone" onClick={areaTextHandler}/>
                        <p>Inne</p>
                    </div>
                    <textarea className={styles.areaText} disabled={!onArea} onChange={textAreaHandler}></textarea>
                </div>
                <div className={styles.main_btn}>
                    <button className={styles.btn} onClick={submitHandler}>Wyślij</button>
                </div>
            </div>
        </div>
    );
};

export default Report;