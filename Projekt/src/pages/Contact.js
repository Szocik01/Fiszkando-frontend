import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux-index";

export default function Contacts()
{
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(positionActions.pagePositionChange(4*3.4));
    },[dispatch])

    return null;
}