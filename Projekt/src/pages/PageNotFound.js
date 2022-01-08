import style from "./PageNotFound.module.css";
import Circe from "../components/formComponents/Circle";
import stylesCircle from "../components/formComponents/Circle.module.css"
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
        <NotFound>Page not found.</NotFound>
      </div>
    </div>
  );
}
