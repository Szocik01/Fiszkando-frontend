import styles from './SingleCoustions.module.css';
import ContainerCard from '../components/UI/ContainerCard';
import logo from '../image/banner.jpg';
import TitleContainerCard from '../components/UI/TitleContainerCard';
import { useState, useEffect, useCallback } from 'react';

const SingleCoustions = () =>{
    const [changeTitle, setChangeTitle] = useState(false);
    const buttonHandler = () =>{
        setChangeTitle(prev=>!prev);
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.managerContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" ><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                </div>
                <div className={styles.titleContainer}>
                    <TitleContainerCard
                        title="Czy masło zda Studia?"
                        image={logo}
                        foto="true"
                    />
                </div>
                <div className={styles.couestionsContener}>
                    <ContainerCard 
                        title="A - Tak"
                        image={logo}
                        foto="true"
                    />
                    <ContainerCard 
                        title="B - Nie"
                        image={logo}
                        foto="true"
                    />
                    {/* <ContainerCard 
                        title="C - Tak na 100%"
                        image={logo}
                        foto="true"
                    />
                    <ContainerCard 
                        title="D - Chuj to wiiiiiii"
                        image={logo}
                        foto="true"
                    /> */}
                </div>
                <div className={styles.btnContainer}>
                    <button type='button' onClick={buttonHandler} className={styles.btn}>{!changeTitle?'Sprawdź':'Następne Pytanie'}</button>
                </div>
            </div>
        </div>
    );
};

export default SingleCoustions;