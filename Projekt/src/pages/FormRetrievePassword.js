import Input from '../components/formComponents/Input';
import styles from './FormRetrievePassword.module.css';
import ButtonShow from '../components/formComponents/buttonShow';
import Spiner from "../components/formComponents/Spinner";
import { useState } from 'react';

const FormRetrievePassword = () =>{
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
        setInputInfo(event.target.value)
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

            console.log(res);
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