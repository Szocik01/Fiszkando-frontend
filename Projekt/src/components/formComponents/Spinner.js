import styles from './Spiner.module.css';

const Spiner = (props) =>{
    return(
        <div className={styles.container}>
            <div className={styles.spiner}></div>
            <p className={styles.ptext}>{props.children}</p>
        </div>
    );
};

export default Spiner;