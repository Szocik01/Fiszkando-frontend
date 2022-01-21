import SingleQuestions from "../components/SingleQuestion/SingleQuestions";
import { Fragment, useState, useEffect } from "react";
import Report from "../components/Report/report";
import { positionActions } from "../storage/redux-index";
import { useDispatch } from "react-redux";

const Questions = () => {
  const [information, setInformation] = useState({});
  const [report, setReport] = useState(false);
  const reportHandler = () => setReport(p=>!p)
  const fetchId = (id) =>{
    setInformation(id);
  };

  const dispatch = useDispatch()


    useEffect(() => {
      dispatch(positionActions.pagePositionChange(0));
    }, [dispatch]);


  return (
    <Fragment>
      {report&&<Report 
        reporthandler={reportHandler} 
        information={information}
      />}
      <SingleQuestions 
        reporthandler={reportHandler}
        fetchId={fetchId}
      />
    </Fragment>
  );
};

export default Questions;
