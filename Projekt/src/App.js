import { Route,Routes } from "react-router-dom";
import Form from "../src/pages/Form";
import NavComponents from "./components/navigationComponents/NavComponents";
import Settings from "./pages/Settings";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import FormRetrievePassword from "./pages/FormRetrievePassword";
import FormResetPassword from "./pages/FormResetPassword";
import Notification from "./pages/Notification";
import { useEffect} from 'react';
import {Authoindenty} from './storage/redux-index'
import { useDispatch } from "react-redux";
import TestStrona from "./pages/TestStrona";
import QuestionsOne from "./pages/QuestionsOne";

function App() { 
  const dispatch = useDispatch();
  useEffect(()=>{
    const Array_of_Cookies = document.cookie.split(';');
    const Final_Cookie_Array  = [];
    const Saved_Cookie_Object  = {};
    for(const key of Array_of_Cookies){
      const obj = {};
      const Half_Array_Cookies = key.split('=');
      obj[Half_Array_Cookies[0].trim()]=Half_Array_Cookies[1];
      Final_Cookie_Array.push(obj);
    }
    for(const key of Final_Cookie_Array){
      for(const key_of_Cookies in key){
        // console.log(key_of_Cookies);
        if(key_of_Cookies==='token' || key_of_Cookies==='uid' || key_of_Cookies==='rememberToken'){
          Saved_Cookie_Object[key_of_Cookies]=key[key_of_Cookies]
          // console.log(Saved_Cookie_Object[key_of_Cookies]);
        }
      }
    }
    dispatch(Authoindenty.IndetificationShow({
      rememberToken: Saved_Cookie_Object.rememberToken,
      uid: Saved_Cookie_Object.uid,
      token: Saved_Cookie_Object.token
    }));
  },[]);


  return (
    <div>
      <NavComponents />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/questions" element={<QuestionsOne />}/>
        <Route path="/TestStrona" element={<TestStrona />}/>
        <Route path="/retrieve_password" element={<FormRetrievePassword />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/settings/*" element={<Settings />}/>
        <Route path="/authentication" element={<Form />}/>
        <Route path="/authorize/reset/:uid/:token" element={<FormResetPassword />}/>
        <Route path="/notification" element={<Notification />}/>
      </Routes>
    </div>
  );
}

export default App;
