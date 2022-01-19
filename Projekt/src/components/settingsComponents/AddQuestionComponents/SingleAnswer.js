import { useRef, useState, useEffect, useCallback } from "react";
import style from "./SingleAnswer.module.css";
import AddImageButton from "../../UI/AddImageButton";

export default function SingleAnswer(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isTooBig, setIsTooBig] = useState(false);
  const [isWrongExtention, setIsWrongExtention] = useState(false);
  const [emptyTextInput, setEmptyTextInput] = useState(true);
  const [wasInputTouched, setWasInputTouched] = useState(false);
  const [imageName, setImageName] = useState("");
  const SingleAnswerRef = useRef();

  const {
    shouldReset,
    setShouldReset,
    currentCourse,
    isModify,
    id,
    hasDataBeenFetched,
    currentQuestion,
    setAnswersAmount,
    answersAmount,
  } = props;

  useEffect(() => {
    if (!isModify) {
      if (id === 0) {
        console.log("domyślne pytanie sie renderuje");
        return;
      }
      props.answerObjects.push({ type: "", value: "" });
      console.log(props.answerObjects);
    }
  }, [id, props.answerObjects, isModify]);

  useEffect(() => {
    if (isModify) {
      if (hasDataBeenFetched) {
        console.log(
          props.answerObjects[id].value,
          "Ponowne odświezenie danych"
        );
        setWasInputTouched(true);
        SingleAnswerRef.current.children[
          props.uniqueClass === "question" ? 0 : 1
        ].value = props.answerObjects[id].value;
        if (props.answerObjects[id].value.trim() !== "") {
          setEmptyTextInput(false);
        }
        if (props.answerObjects[id].type === "mixed") {
          console.log(
            props.answerObjects[id].imageName,
            `${props.answerObjects[id].url}`
          );
          setImageUrl(props.answerObjects[id].url);
          setImageName(props.answerObjects[id].imageName);
        }
      }
    }
  }, [
    isModify,
    id,
    SingleAnswerRef,
    hasDataBeenFetched,
    props.answerObjects,
    answersAmount,
    props.uniqueClass,
  ]);

  function photoPreviewHandler(event) {
    setWasInputTouched(true);
    const allowedExtentionsRegEx = /(\.jpg|\.jpeg|\.png)$/i;
    if (event.target.files && event.target.files.length > 0) {
      if (props.answerObjects[id].imageName) {
        const index = props.imagesArray.findIndex((image) => {
          return image.name === props.answerObjects[id].imageName;
        });
        console.log(index, "index");
        if (index > -1) {
          props.imagesArray.splice(index, 1);
        }
        delete props.answerObjects[id].imageName;
      }
      if (!allowedExtentionsRegEx.exec(event.target.files[0].name)) {
        setIsWrongExtention(true);
        setIsTooBig(false);
        setImageUrl(null);
        event.target.value = "";
        props.answerObjects[id].type = "text";
        console.log(props.answerObjects, "Czy usunęło imageName");
        return;
      }
      if (event.target.files[0].size > 600000) {
        setIsTooBig(true);
        setIsWrongExtention(false);
        setImageUrl(null);
        event.target.value = "";
        props.answerObjects[id].type = "text";
        console.log(props.answerObjects, "Czy usunęło imageName");
        return;
      }
      setIsTooBig(false);
      setIsWrongExtention(false);
      setImageName(event.target.files[0].name);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
      props.answerObjects[id].type = "mixed";
      props.answerObjects[id].imageName = event.target.files[0].name;
      props.imagesArray.push(event.target.files[0]);
      console.log(event.target.files[0], props.imagesArray);
    }
  }

  function deleteAnswer() {
    if (props.answerObjects[id].imageName) {
      const index = props.imagesArray.findIndex((image) => {
        return image.name === props.answerObjects[id].imageName;
      });
      console.log(index, "index delete answer");
      if (index > -1) {
        props.imagesArray.splice(index, 1);
      }
    }
    props.answerObjects.splice(id, 1);
    console.log(
      props.answerObjects,
      "tablica po usunieciu konkretnej odpowiedzi"
    );
    setAnswersAmount(props.answerObjects.length);
  }

  function textInputValidationHandler(event) {
    setIsWrongExtention(false);
    setIsTooBig(false);
    setWasInputTouched(true);
    if (event.target.value.trim() === "") {
      setEmptyTextInput(true);
    } else {
      if (props.answerObjects[id].type !== "mixed") {
        props.answerObjects[id].type = "text";
      }
      setEmptyTextInput(false);
    }
    props.answerObjects[id].value = event.target.value.trim();
    console.log(props.answerObjects);
  }

  const removeInputsData = useCallback(() => {
    SingleAnswerRef.current.children[isModify ? 1 : 0].value = "";
    setWasInputTouched(false);
    setImageUrl(null);
    setIsTooBig(false);
    setIsWrongExtention(false);
  }, [SingleAnswerRef, isModify]);

  useEffect(() => {
    removeInputsData();
    console.log(currentCourse, currentQuestion, "powinno sie resetować");
  }, [removeInputsData, currentCourse, currentQuestion]);

  useEffect(() => {
    if (shouldReset) {
      removeInputsData();
      setShouldReset(false);
    }
  }, [removeInputsData, shouldReset, setShouldReset]);

  function deleteImage(event) {
    console.log(imageName, props.imagesArray, "step 1");
    const index = props.imagesArray.findIndex((image) => {
      return imageName === image.name;
    });
    console.log(index, "index");
    if (index > -1) {
      props.imagesArray.splice(index, 1);
    }
    event.currentTarget.nextElementSibling.children[0].value = "";
    console.log(props.imagesArray, "step 2");
    delete props.answerObjects[id].imageName;
    props.answerObjects[id].type = "text";
    setImageUrl(null);
  }

  return (
    <div
      className={`${style.answerContainer} ${style[props.uniqueClass]}`}
      ref={SingleAnswerRef}
    >
      {isModify && !(props.uniqueClass === "question") && (
        <button
          type="button"
          onClick={deleteAnswer}
          className={style.deleteAnswerButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="white"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
      )}
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
                />
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
