
const buttonShow = props =>{
    return (
        <button className={props.className} type={props.type} onClick={props.onClick} id={props.id} disabled={props.disabled}>{props.children}</button>
    );
};

export default buttonShow;