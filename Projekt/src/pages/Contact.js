import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux-index";

export default function Contacts()
{
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(5*3.4));
        console.log("contacts loaded")
    },[])

    return null;
}