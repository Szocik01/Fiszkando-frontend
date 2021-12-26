import styles from './ContainerCard.module.css';

const ContainerCard = (props) =>{
    return(
        <div className={styles.main}>
            <div className={styles.title}>
                <p>{props.title}</p>
            </div>
            <div className={styles.image}>
                {props.foto==='true' && <img src={props.image} alt='foto' />}
            </div>
        </div>
    );
};

export default ContainerCard;