// import styles from '../../pages/Form.module.css';
const InputChexBox = (props) =>{
    return (
        <>
            <input type={props.type} id={props.id} onChange={props.onChange} className={props.className}/>
            <span>{props.children}</span>
        </>
    );
};

export default InputChexBox;