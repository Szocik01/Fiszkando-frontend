import style from "./SingleCard.module.css";

export default function SingleCard(props) {

    function redirect()
    {
        if(props.isCourses)
        {
            
        }
        else
        {
            props.setIsCourses(true)
            props.setUniversity(props.id);
        }
    }


  return (
    <div className={style.cardContainer} onClick={redirect}>
      <div className={style.overlay}>{!props.isCourses ? "WYBIERZ" : "ZAKUP KURS"}</div>
      <div className={style.image}></div>
      <div className={style.name}>{props.name}</div>
      {props.isCourses && <div className={style.universityName}></div>}
      {props.isCourses && <div className={style.price}></div>}
    </div>
  );
}
