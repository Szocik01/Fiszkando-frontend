import styles from './ContainerCard.module.css';
import { useState } from 'react';

const ContainerCard = (props) =>{
    return(
        <div className={styles.main}>
            <div className={styles.title}>
                <p>{props.title}</p>
            </div>
            <div className={styles.image}>
                {props.foto ? <img src={props.image} alt='foto' /> :''}
            </div>
        </div>
    );
};

export default ContainerCard;