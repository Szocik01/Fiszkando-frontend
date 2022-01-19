import styles from "./SingleQuestions.module.css";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectedCourseActions } from "../../storage/redux-index";
import Question from "./Querstions";

const SingleQuestions = (props) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const courseId = useSelector((state) => state.selectedCourse);
  const auth = useSelector((state) => state.autoIndentification);

  const switchQuestion = () => {
    let newInd = currentIndex;
    if (allQuestions[currentIndex + 1]) {
      setCurrentQuestion(allQuestions[currentIndex + 1]);
      newInd++;
    } else {
      setCurrentQuestion(allQuestions[0]);
      newInd = 0;
    }
    setCurrentIndex(newInd);
    props.fetchId(allQuestions[newInd]);
  };

  const sendQuestions = useCallback(async () => {
    const res = await fetch("http://localhost:8080/get-all", {
      method: "POST",
      body: JSON.stringify({
        courseId: courseId.id,
      }),
      headers: {
        uid: auth.uid,
        token: auth.token,
        remeberMe: auth.remeberMe,
        "Content-Type": "application/json",
      },
    });
    const parsedResponse = await res.json();
    if (res.status === 404 || res.status === 500) {
      return history(`/questions`);
    }
    parsedResponse.forEach((q) => {
      let allAnswears = [];
      q.correctAnswears.forEach((a) => {
        a.isCorrect = true;
        allAnswears.push(a);
      });
      q.falseAnswears.forEach((a) => {
        a.isCorrect = false;
        allAnswears.push(a);
      });
      allAnswears = allAnswears.sort((a, b) => 0.5 - Math.random());
      allAnswears.forEach((a, index) => (a.index = index));
      q.allAnswears = allAnswears;
    });
    const shuffledArray = parsedResponse.sort((a, b) => 0.5 - Math.random());
    setAllQuestions(shuffledArray);
    setCurrentQuestion(shuffledArray[0]);
    props.fetchId(shuffledArray[0]);

    setLoading(false);
  }, [auth, courseId, history]);

  useEffect(() => {
    if (!courseId.id) {
      dispatch(
        SelectedCourseActions.fetchCourseFromCookies({
          success: () => {
            sendQuestions();
          },
          failure: () => {
            history("/chooseCourse/questions");
          },
        })
      );
    } else {
      sendQuestions();
    }
  }, [sendQuestions, courseId.id, history, dispatch]);

  return (
    <div className={styles.container}>
      {!loading && (
        <Question
          currentQuestion={currentQuestion}
          switchQuestion={switchQuestion}
          reporthandler={props.reporthandler}
        />
      )}
    </div>
  );
};

export default SingleQuestions;
