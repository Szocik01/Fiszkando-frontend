import QuestionBaseGenerator from "../components/Question_base/QuestionBaseGenerator";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { positionActions } from "../storage/redux-index";

const QuestionBase = () => {

  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(2 * 3.4));
  }, [dispatch]);

  return <QuestionBaseGenerator />;
};

export default QuestionBase;
