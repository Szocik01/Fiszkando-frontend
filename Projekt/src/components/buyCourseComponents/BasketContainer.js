import style from "./BasketContainer.module.css";
import { useEffect, useState } from "react";
import BasketItem from "./BasketItem";
import { useSelector } from "react-redux";

export default function BasketContainer(props)
{
    const[basketItems,setBasketItems]=useState([]);

    const basketData = useSelector((state)=>{
        return state.basket;
    });

    function showStripeHandler()
    {
        if(basketData.items.length>0)
        {
            props.setShowStripe(true);
        }
    }

    useEffect(()=>{
        setBasketItems(basketData.items.map((item)=>{
            return <BasketItem
            courseName={item.name}
            price={item.price}
            id={item.id}
            key={item.id}
            />
        }))
    },[basketData]);

    return <div className={style.basketDisplay}>
    <div className={style.itemsList}>{basketItems}</div>
    <div className={style.footer}>
      Razem: {basketData.price} zł
        <div className={style.confirmPurchase} onClick={showStripeHandler}>Zapłać</div>
    </div>
  </div>
}