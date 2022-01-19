import styles from './Circle.module.css';

const Circe = (props) =>{
    return (
        <div className={`${styles.circe_main} ${props.className}`}></div>
    );
};

export default Circe;