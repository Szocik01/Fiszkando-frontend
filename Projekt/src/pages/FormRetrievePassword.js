import Input from '../components/formComponents/Input';
import styles from './FormRetrievePassword.module.css';
import ButtonShow from '../components/formComponents/buttonShow';
import Spiner from "../components/formComponents/Spinner";
import Circe from '../components/formComponents/Circle';
import stylesCirce from '../components/formComponents/Circle.module.css';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

const FormRetrievePassword = () =>{
    const history = useNavigate ();
    const [inputInfo, setInputInfo] = useState('');
    const [validInput, setValidInput] = useState(false);
    const [validButton, setValidButton] = useState(false);
    const [loadingSpiner, setLoadingSpiner] = useState(false);
    
    const formTechHandler = (event)=>{
        if(event.target.value.includes('@')){
            setValidInput(false);
            setValidButton(true);
        }else{
            setValidInput(true);
            setValidButton(false);
        }
        setInputInfo(event.target.value);
    }
    const submitHandler = async (event) =>{
        event.preventDefault();
        const enteredMail = inputInfo;
        console.log(enteredMail);
        try{
            setLoadingSpiner(true);
            const res = await fetch('http://localhost:8080/authorize/get-reset',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredMail
                }),
                headers : {
                    "Content-Type": "application/json"
                }
            });
            if(res.status===200){
                return history(`/notification?mode=${res.status}`);
            }
        }catch(error){
            console.log(error);
        }
        setLoadingSpiner(false);
    }
    return (
        <div className={styles.container}>
            {loadingSpiner ? <Spiner>Loading...</Spiner> : ''}
            <Circe />
            <Circe className={stylesCirce.circe1}/>
            <Circe className={stylesCirce.circe2}/>
            <Circe className={stylesCirce.circe3}/>
            <Circe className={stylesCirce.circe4}/>
            <Circe className={stylesCirce.circe5}/>
            <Circe className={stylesCirce.circe6}/>
            <Circe className={stylesCirce.circe7}/>
            <Circe className={stylesCirce.circe8}/>
            <Circe className={stylesCirce.circe9}/>
            <div className={styles.container_all}>
                <div className={styles.paragraf_h1}>
                    <h1>Wpisz E-Mail</h1>
                </div>
                <div className={styles.container_input}>
                    <form onSubmit={submitHandler}>
                        <div className={styles.divForm}>
                            <Input 
                                className={styles.labelInput}
                                id="emial" 
                                type="mail"
                                onChange={formTechHandler}>E-mail
                            </Input>
                            {validInput ? <p className={styles.paragraf}>Proszę wpisać poprawny adres</p> : ''}
                        </div>
                        <div className={styles.divForm}>
                            <ButtonShow 
                                disabled={!validButton} 
                                type="submit" 
                                id="buttonSubmit" 
                                className={styles.submit_btn}>Submit
                            </ButtonShow>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormRetrievePassword;