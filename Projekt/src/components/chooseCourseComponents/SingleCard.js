import style from "./SingleCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { basketActions } from "../../storage/redux-index";
import { useNavigate } from "react-router-dom";

export default function SingleCard(props) 
{
    const basketData=useSelector((state)=>{
        return state.basket;
    });

    const logindata = useSelector((state) => {
        return state.autoIndentification;
      });
      const uid = logindata.uid;
      const token = logindata.token;

    const dispatch=useDispatch();

    const navigator = useNavigate();

    function cardClickHandler()
    {
        if(props.isCourses)
        {
            if(token && uid)
            {
                const index = basketData.items.findIndex((item)=>{
                    return item.id === props.id;
                });
                if(basketData.items.length>0 && index!==-1)
                {
                    return;
                }
                dispatch(basketActions.addToBasket({
                    id:props.id,
                    name:props.name,
                    price:props.price,
                    universityName:props.universityName
                }));
            }
            else
            {
                navigator("/authentication")
            }
        }
        else
        {
            props.setIsCourses(true)
            props.setUniversity(props.id);
        }
    }


  return (
    <div className={style.cardContainer} onClick={cardClickHandler}>
      <div className={style.overlay}>{!props.isCourses ? "WYBIERZ" : uid && token ? "DODAJ DO KOSZYKA" : "ZALOGUJ SIĘ"}</div>
      <div className={style.image}></div>
      <div className={style.name}>{props.name}</div>
      {props.isCourses && <div className={style.universityName}>{props.universityName}</div>}
      {props.isCourses && <div className={style.price}>{props.price} zł</div>}
    </div>
  );
}
