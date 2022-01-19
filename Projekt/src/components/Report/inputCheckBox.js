import styles from './inputCheckBox.module.css';

const InputChexBox = (props) =>{
    const handler = () =>{
        props.value(props.children);
    };

    return(
        <div className={styles.caontainer}>
            <div className={styles.container_Input}>
                <input
                    type={props.type || 'radio'}
                    name="drone"
                    onClick={handler}
                />
            </div>
            <div className={styles.container_info}>
                <p>{props.children}</p>
            </div>
        </div>
    );
};

export default InputChexBox;