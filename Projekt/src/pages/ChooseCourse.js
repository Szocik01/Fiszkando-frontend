import style from "./ChooseCourse.module.css";
import CoursesContainer from "../components/chooseCourseComponents/CoursesContainer";
import UniversitiesContainer from "../components/chooseCourseComponents/UniversitiesContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { positionActions } from "../storage/redux-index";
import { informationBoxManagerActions } from "../storage/information-box";

export default function ChooseCourse() {
  const [isCourses, setIsCourses] = useState(false);
  const [university, setUniversity] = useState("");
  const [httpError, setHttpError] = useState("");
  const [isSpinnerActive, setIsSpinnerActive] = useState(false);

  const dispatch = useDispatch();

  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const uid = logindata.uid;
  const token = logindata.token;

  const basketData=useSelector((state)=>{
    return state.basket;
  });

  console.log(basketData)

  useEffect(()=>{
    if(httpError)
    {
      dispatch(informationBoxManagerActions.setBox({message:httpError,isError:true}));
      dispatch(informationBoxManagerActions.toggleVisibility());
      setHttpError("");
    }
  },[httpError,dispatch]);

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(3 * 3.4));
  }, [dispatch]);

  return (
    <div className={`${style.siteContainer} ${uid && token && style.logged}`}>
      <UniversitiesContainer
        setUniversity={setUniversity}
        setHttpError={setHttpError}
        setIsSpinnerActive={setIsSpinnerActive}
        setIsCourses={setIsCourses}
        isSpinnerActive={isSpinnerActive}
        isCourses={isCourses}
      />
      <CoursesContainer
        setIsCourses={setIsCourses}
        setHttpError={setHttpError}
        setIsSpinnerActive={setIsSpinnerActive}
        university={university}
        isSpinnerActive={isSpinnerActive}
        isCourses={isCourses}
        basketData={basketData}
      />
    </div>
  );
}
