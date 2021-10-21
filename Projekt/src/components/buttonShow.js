import styles from './buttonShow.module.css';
const ButtonShow = props =>{
    return (
        <button className={styles.button} type={props.type} onClick={props.onClick}>{props.children}</button>
    );
};

export default ButtonShow;