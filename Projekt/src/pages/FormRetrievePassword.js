import Input from '../components/formComponents/Input';
import styles from './FormRetrievePassword.module.css';
import ButtonShow from '../components/formComponents/buttonShow';
import Spiner from "../components/formComponents/Spinner";
import { useState } from 'react';

const FormRetrievePassword = () =>{
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
        console.log(event.target.value);
    }
    const submitHandler = async (event) =>{
        event.preventDefault();
        const email = validInput;
        try{
            setLoadingSpiner(true);
            const res = await fetch('http://localhost:8080/authorize/get-reset',
            {
                method: 'POST',
                body: JSON.stringify({
                    email
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
            <div className={styles.container_input}>
                <form onSubmit={submitHandler}>
                    <div className={styles.divForm}>
                        <Input 
                            id="emial" 
                            type="E-mail"
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
    );
};

export default FormRetrievePassword;