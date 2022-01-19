import { Fragment, useEffect, useState,useRef } from "react";
import style from "./NavComponents.module.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";


export default function NavComponents() {
  const [isUnfolded, setIsUnfolded] = useState(false);

  const backdropRef=useRef();

  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const uid = logindata.uid;
  const token = logindata.token;

  function unfoldingHandler() {
    setIsUnfolded((prevState) => {
      return !prevState;
    });
    backdropRef.current.style.display="block";
    backdropRef.current.style.opacity=0;
  }

  console.log(isUnfolded);

  useEffect(() => {
    let timerShowClass;
    let timerHideClass;

    if (isUnfolded === true) {
      timerShowClass = setTimeout(() => {
        backdropRef.current.style.opacity=1;
      }, 10);
    } else {
      backdropRef.current.style.opacity=0;
      timerHideClass = setTimeout(() => {
        backdropRef.current.style.display="none";
      }, 210);
    }

    return () => {
      if (isUnfolded === false) {
        clearTimeout(timerHideClass);
      } else {
        clearTimeout(timerShowClass);
      }
    };
  }, [isUnfolded]);

  return (
    <Fragment>
      <Navbar onUnfolding={unfoldingHandler} />
      {uid && token && <Sidebar onUnfolding={unfoldingHandler} isUnfolded={isUnfolded} />}
        <div
          ref={backdropRef}
          className={style.backdrop}
          onClick={unfoldingHandler}
        ></div>
    </Fragment>
  );
}
