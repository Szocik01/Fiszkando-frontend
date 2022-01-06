import style from "./PageNotFound.module.css";
import Circe from "../components/formComponents/Circle";
import stylesCircle from "../components/formComponents/Circle.module.css"
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
        <Circe />
        <Circe className={stylesCircle.circe1} />
        <Circe className={stylesCircle.circe2} />
        <Circe className={stylesCircle.circe3} />
        <Circe className={stylesCircle.circe4} />
        <Circe className={stylesCircle.circe5} />
        <Circe className={stylesCircle.circe6} />
        <Circe className={stylesCircle.circe7} />
        <Circe className={stylesCircle.circe8} />
        <Circe className={stylesCircle.circe9} />
      <div className={style.infoContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#8465ff">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <p>Page not found</p>
      </div>
    </div>
  );
}
