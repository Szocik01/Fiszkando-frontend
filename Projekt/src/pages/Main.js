import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux-index";

export default function Main() {
  
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(0));
  }, [dispatch]);

  return null;
}
