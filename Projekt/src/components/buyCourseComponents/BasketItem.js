import style from "./BasketItem.module.css";
import { useDispatch } from "react-redux";
import { basketActions } from "../../storage/redux-index";


export default function BasketItem(props)
{
    const dispatch = useDispatch();

    function removeFromBasketHandler()
    {
        dispatch(basketActions.removeFromBasket(props.id));
    }

    return <div className={style.item}>
        <div className={style.courseName}>{props.courseName}</div>
        <div className={style.price}>{props.price} zł</div>
        <div className={style.deleteButton} onClick={removeFromBasketHandler}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="white">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </div>
    </div>
}