import SingleAnswer from "../AddQuestionComponents/SingleAnswer";
import style from "./AddQuestion.module.css";
import { Fragment,useMemo, useEffect, useState, useCallback} from "react";
import Spiner from "../../formComponents/Spinner";

export default function AddQuestion() {
  const [universityList,setUniversityList] = useState([]);
  const [isSpinnerActive, setIsSpinnerActive]=useState(false);
  const [courseList, setCourseList] = useState([]);
  const [httpError,setHttpError]=useState(null);
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [trueQuestionsAmount, setTrueQuestionsAmount] = useState(1);
  const [falseQuestionsAmount, setFlaseQuestionsAmount] = useState(1);
  const [isSubmitionError,setIsSubmitionError]=useState(false);
  
  const x=decodeURIComponent(document.cookie);
  const cookies=x.split(";");
  const remember=cookies[0].split("=")[1];
  const uid=cookies[1].split("=")[1];
  const token=cookies[2].split("=")[1];


  //const [cookies,setCookies]=useState();
  
  const correctAnswers=useMemo(()=>{ return []},[]);
  const wrongAnswers=useMemo(()=>{ return []},[]);
  const imagesArray=useMemo(()=>{ return []},[]);
  const questionObject=useMemo(()=>{return []},[]);

  function selectInputChangeHandler(event) {
    if (event.target.id === "university") {
      setUniversity(event.target.value);
    } else {
      setCourse(event.target.value);
      correctAnswers.splice(0,correctAnswers.length);
      correctAnswers.push({type:"",value:""})
      wrongAnswers.splice(0,wrongAnswers.length);
      wrongAnswers.push({type:"",value:""});
      questionObject.splice(0,questionObject.length);
      questionObject.push({type:"",value:""});
      imagesArray.splice(0,imagesArray.length);
      console.log(correctAnswers,wrongAnswers,imagesArray);
      setTrueQuestionsAmount(1);
      setFlaseQuestionsAmount(1);
    }
  }

  function questionSubmitHandler(event)
  {
    setIsSubmitionError(false);
    event.preventDefault();
    const formData= new FormData();
    let mainType="text";
    if(!course)
    {
      setIsSubmitionError(true);
      return;    
    }
    formData.append("courseId",`${course}`);
    if(questionObject[0].value.trim()==="")
    {
      setIsSubmitionError(true);
      return;
    }
    formData.append("question",JSON.stringify(questionObject[0]));
    console.log(formData.getAll("question"));
    correctAnswers.forEach((item)=>{
      console.log(item);
      if(item.value.trim()==="" && !item.imageName)
      {
       setIsSubmitionError(true); 
      }
    });
    wrongAnswers.forEach((item)=>{
      console.log(item);
      if(item.value.trim()==="" && !item.imageName)
      {
       setIsSubmitionError(true); 
      }
    })
      formData.append("correctAnswears",JSON.stringify(correctAnswers));  
      formData.append("falseAnswears",JSON.stringify(wrongAnswers));
      if(imagesArray.length>0)
      {
        mainType="mixed";
        imagesArray.forEach((item)=>{
          formData.append("images",item);
        });
      }
      formData.append("questionType",mainType);
      for( const [key,value] of formData)
      {
        console.log(key,value);
      }
      console.log(formData.getAll("images"))
      if(!isSubmitionError)
      {
        fetch("http://localhost:8080/add-question",{
        method:"POST",
        headers:{
          "uid": uid,
          "token": token},
        body: formData
        }).then((response)=>{
          if(!response.ok)
          {
            console.log(response.status);
          }
          return response.json();
        }).then((data)=>{
          console.log(data);
        })
     }
}

  function addAnotherAnswerHandler(event) {
    if (event.target.id === "true") {
      setTrueQuestionsAmount((prevValue) => {
        return prevValue + 1;
      });
    } else {
      setFlaseQuestionsAmount((prevValue) => {
        return prevValue + 1;
      });
    }
  }

  const getUniversities = useCallback(async()=>{
    setHttpError(null);
    setIsSpinnerActive(true);
    try
    {
      const response = await fetch("http://localhost:8080/get-all-schools");
      if(!response.ok)
      {
        throw new Error("Wystąpił błąd serwera. Proszę czekać.");
      }
      const data = await response.json();
      console.log(data);
      setUniversityList(data.map((item)=>{
        return <option value={item._id} key={item._id}>{item.name}</option>;
      }));
      setIsSpinnerActive(false);
    }
    catch(error)
    {
      setIsSpinnerActive(false);
      setHttpError(error.message);
    }
  },[]);

  const getCourses = useCallback(async ()=>{
    setHttpError(null);
    setIsSpinnerActive(true);
    try
    {
      const response= await fetch("http://localhost:8080/get-all-courses",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({schoolId: university})
      });
      if(!response.ok)
      {
        throw new Error("Wystąpił błąd serwera. Proszę czekać.");
      }
      const data= await response.json();
      console.log(data);
      setCourseList(data.map((item)=>{
        return <option value={item._id} key={item._id}>{item.name}</option>
      }))
      setIsSpinnerActive(false);
    }
    catch(error)
    {
      setIsSpinnerActive(false);
      setHttpError(error.message);
    }
  },[university]);

  let trueAnswerElementArray = [];
  let falseAnswerElementArray = [];

  for (let i = 0; i < trueQuestionsAmount; i++) {
    trueAnswerElementArray.push(
      <SingleAnswer key={`${i}`} id={i} answerObjects={correctAnswers} imagesArray={imagesArray} currentCourse={course} uniqueClass={"correct"} />
    );
  }

  for (let i = 0; i < falseQuestionsAmount; i++) {
    falseAnswerElementArray.push(
      <SingleAnswer key={`${i}`} id={i}  answerObjects={wrongAnswers} imagesArray={imagesArray} currentCourse={course}  uniqueClass={"wrong"} />
    );
  }

  useEffect(() => {
    if (university.trim() === "" || course.trim() === "") {
      setShowQuestionForm(false);
    }
    else
    {
      setShowQuestionForm(true);
    }
  }, [university, course]);

  useEffect(()=>{
    getUniversities();
  },[getUniversities]);

  useEffect(()=>{
    getCourses();
  },[university,getCourses]);

  return (
    <Fragment>
      {isSpinnerActive && <Spiner>Loading...</Spiner>}
      <form onSubmit={questionSubmitHandler}>
        {httpError && <div className={style.errorInfo}>{httpError}</div>}
        <div className={style.selectContainer}>
          <label htmlFor="university">Wybierz uniwersytet:</label>
          <select
            id="university"
            onChange={selectInputChangeHandler}
            defaultValue="">
            <option value="">-</option>
            {universityList}
          </select>
          <label htmlFor="course">Wybierz kurs:</label>
          <select
            id="course"
            onChange={selectInputChangeHandler}
            defaultValue="">
            <option value="">-</option>
            {courseList}
          </select>
        </div>
        {showQuestionForm && (
          <div className={style.questionDataContainer}>
            <SingleAnswer id={0} answerObjects={questionObject} imagesArray={imagesArray} currentCourse={course} uniqueClass={"question"}/>
            {trueAnswerElementArray}
            <div
              className={style.newAnswerButton}
              onClick={addAnotherAnswerHandler}
              id="true">
              Dodaj kolejną poprawną odpowiedź
            </div>
            {falseAnswerElementArray}
            <div
              className={style.newAnswerButton}
              onClick={addAnotherAnswerHandler}
              id="false">
              Dodaj kolejną błędną odpowiedź
            </div>
          </div>
        )}
        {showQuestionForm && <button type="submit">Potwierdź</button>}
        {isSubmitionError && <p>Nie wysłano zapytania do serwera. Prosimy uzupełnić dane.</p>}
      </form>
    </Fragment>
  );
}
