import style from "./BuyCourse.module.css"
import Stripe from "../components/chooseCourseComponents/Stripe"
import BasketContainer from "../components/buyCourseComponents/BasketContainer"
import { useEffect,useState } from "react"
import { useDispatch } from "react-redux"
import { positionActions } from "../storage/redux-index"

export default function BuyCourse()
{
    const [showStripe,setShowStripe]=useState(false);

    const dispatch=useDispatch();

    useEffect(() => {
        dispatch(positionActions.pagePositionChange(4 * 3.4));
      }, [dispatch]);

    return <div className={style.siteContainer}>
        {showStripe ? <Stripe/> :<BasketContainer setShowStripe={setShowStripe}/>}
    </div>
}