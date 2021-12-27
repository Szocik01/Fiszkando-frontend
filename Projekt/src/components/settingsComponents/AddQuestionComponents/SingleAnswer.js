import { useRef, useState, useEffect, useCallback } from "react";
import style from "./SingleAnswer.module.css";
import AddImageButton from "./AddImageButton";

export default function SingleAnswer(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isTooBig, setIsTooBig] = useState(false);
  const [isWrongExtention, setIsWrongExtention] = useState(false);
  const [emptyTextInput, setEmptyTextInput] = useState(true);
  const [wasInputTouched, setWasInputTouched] = useState(false);
  const [imageName, setImageName] = useState("");
  const SingleAnswerRef = useRef();

  const { shouldReset, setShouldReset, currentCourse } = props;

  useEffect(() => {
    if (props.id === 0) {
      console.log("domyślne pytanie sie renderuje");
      return;
    }
    props.answerObjects.push({ type: "", value: "" });
    console.log(props.answerObjects);
  }, [props.id, props.answerObjects]);

  function photoPreviewHandler(event) {
    setWasInputTouched(true);
    const allowedExtentionsRegEx = /(\.jpg|\.jpeg|\.png)$/i;
    if (event.target.files && event.target.files.length > 0) {
      if (!allowedExtentionsRegEx.exec(event.target.files[0].name)) {
        setIsWrongExtention(true);
        setIsTooBig(false);
        setImageUrl(null);
        event.target.value = "";
        if (props.answerObjects[props.id].imageName) {
          const index = props.imagesArray.findIndex((image) => {
            return image.name === props.answerObjects[props.id].imageName;
          });
          console.log(index);
          props.imagesArray.splice(index, 1);
          delete props.answerObjects[props.id].imageName;
        }
        props.answerObjects[props.id].type = "text";
        console.log(props.answerObjects, "Czy usunęło imageName");
        return;
      }
      if (event.target.files[0].size > 600000) {
        setIsTooBig(true);
        setIsWrongExtention(false);
        setImageUrl(null);
        event.target.value = "";
        if (props.answerObjects[props.id].imageName) {
          const index = props.imagesArray.findIndex((image) => {
            return image.name === props.answerObjects[props.id].imageName;
          });
          console.log(index);
          props.imagesArray.splice(index, 1);
          delete props.answerObjects[props.id].imageName;
        }
        props.answerObjects[props.id].type = "text";
        console.log(props.answerObjects, "Czy usunęło imageName");
        return;
      }
      setIsTooBig(false);
      setIsWrongExtention(false);
      setImageName(event.target.files[0].name);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
      props.answerObjects[props.id].type = "mixed";
      props.answerObjects[props.id].imageName = event.target.files[0].name;
      props.imagesArray.push(event.target.files[0]);
      console.log(event.target.files[0], props.imagesArray);
    }
  }

  function textInputValidationHandler(event) {
    setIsWrongExtention(false);
    setIsTooBig(false);
    setWasInputTouched(true);
    if (event.target.value.trim() === "") {
      setEmptyTextInput(true);
    } else {
      if (props.answerObjects[props.id].type !== "mixed") {
        props.answerObjects[props.id].type = "text";
      }
      setEmptyTextInput(false);
    }
    props.answerObjects[props.id].value = event.target.value.trim();
    console.log(props.answerObjects);
  }

  const removeInputsData = useCallback(() => {
    SingleAnswerRef.current.children[0].value = "";
    setWasInputTouched(false);
    setImageUrl(null);
    setIsTooBig(false);
    setIsWrongExtention(false);
  }, [SingleAnswerRef]);

  useEffect(() => {
    removeInputsData();
  }, [removeInputsData, currentCourse]);

  useEffect(() => {
    if (shouldReset) {
      removeInputsData();
      setShouldReset(false);
    }
  }, [removeInputsData, shouldReset, setShouldReset]);

  function deleteImage(event) {
    console.log(
      event.currentTarget.nextElementSibling.children[0].files[0].name,
      props.imagesArray,
      "step 1"
    );
    const index = props.imagesArray.findIndex((image) => {
      console.log(image.name);
      return (
        event.currentTarget.nextElementSibling.children[0].files[0].name ===
        image.name
      );
    });
    console.log(index, "index");
    props.imagesArray.splice(index, 1);
    console.log(props.imagesArray, "step 2");
    event.currentTarget.nextElementSibling.children[0].value = "";
    delete props.answerObjects[props.id].imageName;
    props.answerObjects[props.id].type = "text";
    setImageUrl(null);
  }

  return (
    <div
      className={`${style.answerContainer} ${style[props.uniqueClass]}`}
      ref={SingleAnswerRef}
    >
      <input type="text" onBlur={textInputValidationHandler} />
      <div
        className={`${style.container} ${
          props.uniqueClass === "question" &&
          style.questionImageAndErrorContainer
        }`}
      >
        <div className={style.imagePreviewContainer}>
          {imageUrl && (
            <div className={style.deleteImage} onClick={deleteImage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22px"
                viewBox="0 0 24 24"
                width="24px"
                fill="white"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
              </svg>
            </div>
          )}
          <label>
            <input
              type="file"
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png"
              onChange={photoPreviewHandler}
            />
            <div className={style.imagePreview}>
              {!imageUrl ? (
                <AddImageButton />
              ) : (
                <img
                  className={style.image}
                  src={`${imageUrl}`}
                  alt="Nie można wyświetlić obrazu"
                ></img>
              )}
            </div>
          </label>
        </div>
        <div className={style.errorsContainer}>
          {isTooBig && <p>Obraz nie powinien przekraczać 600kb.</p>}
          {isWrongExtention && <p>Plik posiada niewłaściwe rozszerzenie.</p>}
          {props.uniqueClass === "question"
            ? wasInputTouched &&
              !isTooBig &&
              !isWrongExtention &&
              emptyTextInput && <p>Prosze uzupełnić odpowiedź.</p>
            : wasInputTouched &&
              !imageUrl &&
              emptyTextInput &&
              !isTooBig &&
              !isWrongExtention && <p>Prosze uzupełnić odpowiedź.</p>}
          {props.uniqueClass === "question"
            ? !emptyTextInput &&
              imageUrl && <p className={style.imageNameText}>{imageName}</p>
            : imageUrl && <p className={style.imageNameText}>{imageName}</p>}
        </div>
      </div>
    </div>
  );
}
