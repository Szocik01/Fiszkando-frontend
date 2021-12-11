import { useRef, useState, useEffect } from "react";
import style from "./SingleAnswer.module.css";

export default function SingleAnswer(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isTooBig, setIsTooBig] = useState(false);
  const [isWrongExtention,setIsWrongExtention] = useState(false);
  const [emptyTextInput,setEmptyTextInput] = useState(true);
  const [wasInputTouched,setWasInputTouched] =useState(false);
  const SingleAnswerRef=useRef();

  useEffect(()=>{
    if(props.id===0)
    {
      console.log("domyślne pytanie sie renderuje");
      return;
    }
    props.answerObjects.push({type:"",value:""});
    console.log(props.answerObjects);
  },[props.id,props.answerObjects]);

  function photoPreviewHandler(event) {
    setWasInputTouched(true);
    const allowedExtentionsRegEx= /(\.jpg|\.jpeg|\.png)$/i;
    if (event.target.files && event.target.files.length > 0) 
    {
      if(!allowedExtentionsRegEx.exec(event.target.files[0].name))
      {
        setIsWrongExtention(true);
        setIsTooBig(false);
        setImageUrl(null);
        event.target.value="";
        if(props.answerObjects[props.id].imageName)
        {
          const index=props.imagesArray.findIndex((image)=>{ return image.name=== props.answerObjects[props.id].imageName});
          console.log(index);
          props.imagesArray.splice(index,1);
          delete props.answerObjects[props.id].imageName;
        }
        props.answerObjects[props.id].type="text";
        console.log(props.answerObjects,"Czy usunęło imageName");
        return;
      }
      if (event.target.files[0].size > 600000) 
      {
        setIsTooBig(true);
        setIsWrongExtention(false);
        setImageUrl(null);
        event.target.value="";
        if(props.answerObjects[props.id].imageName)
        {
          const index=props.imagesArray.findIndex((image)=>{ return image.name=== props.answerObjects[props.id].imageName});
          console.log(index);
          props.imagesArray.splice(index,1);
          delete props.answerObjects[props.id].imageName;
        }
        props.answerObjects[props.id].type="text";
        console.log(props.answerObjects,"Czy usunęło imageName");
        return;
      }
        setIsTooBig(false);
        setIsWrongExtention(false);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        props.answerObjects[props.id].type="mixed";
        props.answerObjects[props.id].imageName=event.target.files[0].name;
        props.imagesArray.push(event.target.files[0]);
        console.log(event.target.files[0],props.imagesArray);
    }
  }

  function textInputValidationHandler(event)
  {
    setIsWrongExtention(false);
    setIsTooBig(false);
    setWasInputTouched(true);
    if(event.target.value.trim()==="")
    {
      setEmptyTextInput(true);
    }
    else
    {
      if(props.answerObjects[props.id].type!=="mixed")
      {
        props.answerObjects[props.id].type="text";
      }
      setEmptyTextInput(false);
    }
    props.answerObjects[props.id].value=event.target.value.trim();
    console.log(props.answerObjects);
  }

  useEffect(()=>{
    SingleAnswerRef.current.children[1].value="";
    SingleAnswerRef.current.children[2].value="";
    setImageUrl(null);
    setIsTooBig(false);
    setIsWrongExtention(false);
  },[props.currentCourse]);

  /*function sth(event)
  {
    console.log(event.target.parentElement.children[2].value);
    event.target.parentElement.children[2].value="";
    setImageUrl(null)
  }*/

  return (
    <div className={`${style.answerContainer} ${props.uniqueClass}`} ref={SingleAnswerRef}>
      <h4>
        {props.uniqueClass==="wrong" &&"Dodaj błędną odpowiedź:"}
        {props.uniqueClass==="correct" &&"Dodaj poprawną odpowiedź:"}
        {props.uniqueClass==="question" &&"Dodaj treść pytania:"}
      </h4>
      <input type="text" onBlur={textInputValidationHandler}/>
      <input type="file" accept=".jpg,.jpeg,.png" onChange={photoPreviewHandler} />
      <div className={style.imagePreview}>
        {!imageUrl ? (
          "Image empty"
        ) : (
          <img className={style.image} src={`${imageUrl}`} alt="Nie można wyświetlić obrazu"></img>
        )}
      </div>
      {isTooBig && <p>Obraz nie powinien przekraczać 600kb.</p>}
      {isWrongExtention && <p>Plik posiada niewłaściwe rozszerzenie.</p>}
      {props.uniqueClass==="question"?(wasInputTouched && !isTooBig && !isWrongExtention && emptyTextInput)&&<p>Prosze uzupełnić odpowiedź.</p>
      :(wasInputTouched && !imageUrl && emptyTextInput && !isTooBig && !isWrongExtention)&&<p>Prosze uzupełnić odpowiedź.</p>}
    </div>
  );
}