import { Route, Routes } from "react-router-dom";
import Form from "../src/pages/Form";
import NavComponents from "./components/navigationComponents/NavComponents";
import Settings from "./pages/Settings";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import FormRetrievePassword from "./pages/FormRetrievePassword";
import FormResetPassword from "./pages/FormResetPassword";
import Notification from "./pages/Notification";
import React, { Fragment, useCallback, useEffect } from "react";
import { Authoindenty } from "./storage/redux-index";
import { useDispatch, useSelector } from "react-redux";
import TestStrona from "./pages/TestStrona";
import Questions from "../src/pages/Questions";
import SingleQuestions from "./components/SingleQuestion/SingleQuestions";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import PageNotFound from "./pages/PageNotFound";
import { useState } from "react";
import styles from "./App.module.css";
import Circe from "../src/components/formComponents/Circle";
import stylesCirce from "../src/components/formComponents/Circle.module.css";
import QuestionBase from "../src/pages/QuestionBase";
import QuestionBaseGenerator from "../src/components/Question_base/QuestionBaseGenerator";
import BuyCourse from "./pages/BuyCourse";
import Stripe from "./components/buyCourseComponents/Stripe";
import Confirmation from "./components/buyCourseComponents/Confirmation";
import io from "socket.io-client";
import AllCourse from "./components/AllCursePage/AllCourse";

function App() {
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(true);
  const dispatch = useDispatch();
  const socket = io.connect("http://localhost:8080");

  useEffect(() => {
    socket.on("connect", () => {
      if (socket.connect_error) {
        setAccess(false);
      }
    });
    socket.on("to_many_users", (data) => {
      if (socket.id !== data.validSession) {
        setAccess(false);
      }
    });
  }, [socket]);

  useEffect(() => {
    console.log("Acces changed: ", access);
  }, [access]);

  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const uid = logindata.uid;
  const token = logindata.token;

  const getCookies = useCallback(() => {
    const Array_of_Cookies = document.cookie.split(";");
    const Final_Cookie_Array = [];
    const Saved_Cookie_Object = {};
    for (const key of Array_of_Cookies) {
      const obj = {};
      const Half_Array_Cookies = key.split("=");
      obj[Half_Array_Cookies[0].trim()] = Half_Array_Cookies[1];
      Final_Cookie_Array.push(obj);
    }
    for (const key of Final_Cookie_Array) {
      for (const key_of_Cookies in key) {
        // console.log(key_of_Cookies);
        if (
          key_of_Cookies === "token" ||
          key_of_Cookies === "uid" ||
          key_of_Cookies === "rememberToken" ||
          key_of_Cookies === "idCurse"
        ) {
          Saved_Cookie_Object[key_of_Cookies] = key[key_of_Cookies];
          // console.log(Saved_Cookie_Object[key_of_Cookies]);
        }
      }
    }
    return Saved_Cookie_Object;
  }, []);

  const checkInitialCookies = useCallback(
    async (authCookies) => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/login-checker", {
          method: "POST",
          body: JSON.stringify({
            uid: authCookies.uid,
            token: authCookies.token,
            rememberToken: authCookies.rememberToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const parsedRes = await res.json();
        if (res.status === 200) {
          socket.emit("user_logged_in", authCookies.uid);
          dispatch(
            Authoindenty.IndetificationShow({
              rememberToken: authCookies.rememberToken,
              uid: authCookies.uid,
              token: parsedRes.newToken
                ? parsedRes.newToken.token
                : authCookies.token,
              permissions: parsedRes.permissions,
            })
          );
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const authCookies = getCookies();
    if ((authCookies.rememberToken || authCookies.token) && authCookies.uid) {
      checkInitialCookies(authCookies);
    }
    setLoading(false);
  }, [getCookies, checkInitialCookies]);

  return (
    <div className={styles.container}>
      <Circe />
      <Circe className={stylesCirce.circe1} />
      <Circe className={stylesCirce.circe2} />
      <Circe className={stylesCirce.circe3} />
      <Circe className={stylesCirce.circe4} />
      <Circe className={stylesCirce.circe5} />
      <Circe className={stylesCirce.circe6} />
      <Circe className={stylesCirce.circe7} />
      <Circe className={stylesCirce.circe8} />
      <Circe className={stylesCirce.circe9} />
      <div className={styles.main_container}>
        <NavComponents />
        {loading && (
          <div className={styles["loading-container"]}>
            <LoadingSpinner />
          </div>
        )}
        {!loading && (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/buy_course" element={<BuyCourse />} />

            {uid && token && access && (
              <Fragment>
                <Route path="/checkout" element={<Stripe />} />
                <Route path="/checkout/:uid" element={<Confirmation />} />
                <Route path="/singleQuestions" element={<SingleQuestions />} />
                <Route path="/chooseCourse/:action" element={<AllCourse />} />
                <Route path="/questions" element={<Questions />} />
                <Route
                  path="/questions_baseGenerator"
                  element={<QuestionBaseGenerator />}
                />
                <Route path="/question_base" element={<QuestionBase />} />
                <Route path="/TestStrona" element={<TestStrona />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/settings/*" element={<Settings />} />
              </Fragment>
            )}
            <Route
              path="/retrieve_password"
              element={<FormRetrievePassword />}
            />
            {!(uid && token) && (
              <Route
                path="/authentication"
                element={<Form socket={socket} />}
              />
            )}
            <Route
              path="/authorize/reset/:uid/:token"
              element={<FormResetPassword />}
            />
            <Route path="/notification" element={<Notification />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
