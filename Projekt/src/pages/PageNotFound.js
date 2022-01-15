import style from "./PageNotFound.module.css";
import NotFound from "../components/UI/NotFound";
import { useSelector } from "react-redux";

export default function PageNotFound() {
  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const uid = logindata.uid;
  const token = logindata.token;

  return (
    <div
      className={`${style.pageContainer} ${uid && token ? style.logged : ""}`}>
      <div className={style.infoContainer}>
        <NotFound>Page not found.</NotFound>
      </div>
    </div>
  );
}
