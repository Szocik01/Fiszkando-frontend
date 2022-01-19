import style from "./NewAnswerButton.module.css";

export default function NewAnswerButton(props)
{
    return <button type="button" id={props.id} onClick={props.addAnotherAnswerHandler} className={style.newAnswerButton}>
        Dodaj kolejną odpowiedź
    </button>
}