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
import AllCourse from "./pages/AllCourse";
import SingleCoustions from "./pages/SingleCoustions";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import PageNotFound from "./pages/PageNotFound";
import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
    checkInitialCookies(authCookies);
  }, [getCookies, checkInitialCookies]);

  return (
    <div>
      <NavComponents />
      {loading && (
        <div className={styles["loading-container"]}>
          <LoadingSpinner />
        </div>
      )}
      {!loading && (
        <Routes>
          <Route path="/" element={<Main />} />
          {uid && token && (
            <Fragment>
              <Route path="/singleCoustions" element={<SingleCoustions />} />
              <Route path="/questions" element={<AllCourse />} />
              <Route path="/TestStrona" element={<TestStrona />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/settings/*" element={<Settings />} />
            </Fragment>
          )}
          <Route path="/retrieve_password" element={<FormRetrievePassword />} />
          {!(uid && token) && (
            <Route path="/authentication" element={<Form />} />
          )}
          <Route
            path="/authorize/reset/:uid/:token"
            element={<FormResetPassword />}
          />
          <Route path="/notification" element={<Notification />} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      )}
    </div>
  );
}

export default App;
