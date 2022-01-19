import SingleQuestions from "../components/SingleQuestion/SingleQuestions";
import { Fragment, useState } from "react";
import Report from "../components/Report/report";

const Questions = () => {
  const [information, setInformation] = useState({});
  const [report, setReport] = useState(false);
  const reportHandler = () => setReport(p=>!p)
  const fetchId = (id) =>{
    setInformation(id);
  };

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
