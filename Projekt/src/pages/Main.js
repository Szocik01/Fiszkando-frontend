import style from "./Main.module.css";
import { useSelector, useDispatch } from "react-redux";
import SingleSection from "../components/mainPageComponents/SingleSection";
import { positionActions } from "../storage/redux-index";
import { useEffect,useState } from "react";
import Main1 from "../image/Main1.jpg";
import Main2 from "../image/Main2.jpg";
import Main3 from "../image/Main3.jpg";
import { useRef,useCallback} from "react";

export default function Main() {
  const [sectionVisible,setSectionVisible]=useState({
    s1:false,
    s2:false,
    s3:false,
    s4:false
  });
  
  const dispatch = useDispatch();

  const sectionsContainerRef=useRef();

  const logindata = useSelector((state) => {
    return state.autoIndentification;
  });
  const uid = logindata.uid;
  const token = logindata.token;

  const callback=useCallback((entries,observer)=>{
    entries.forEach((entry)=>{
      console.log("obiekty",entries)
      if(!entry.isIntersecting)
      {
        return;
      }
      else
      {
        console.log(entry.target.getAttribute("id"))
        setSectionVisible((prevVal)=>{
          const newObj={...prevVal};
          newObj[`s${entry.target.getAttribute("id")}`] = true;
          return newObj;
        })
        observer.unobserve(entry.target);
      }
    })
  },[]);

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(null));
  }, [dispatch]);

  useEffect(()=>{
    console.log(sectionVisible)
  },[sectionVisible])

  useEffect(()=>{
    const observer = new IntersectionObserver(callback,{
      root: sectionsContainerRef.current,
      rootMargin:"0px 700px 0px 700px",
      threshold:0.4
    });
    if(sectionsContainerRef.current)
    {
      for(const section of sectionsContainerRef.current.children)
      {
        observer.observe(section);
      }
    }
  },[sectionsContainerRef,callback]);

  return (
    <div
      className={`${style.siteContainer} ${uid && token ? style.logged : ""}`} ref={sectionsContainerRef}>
      <SingleSection first={true} isVisible={sectionVisible.s1} id="1" text="Fiszkando to zbi??r wiedzy potrzebnej ka??demu studentowi do zdania sesji. Dzi??ki Fiszkando ju?? ponad 100 os??b zda??o sesj?? z wyj??tkowo trudnych przedmiot??w. Mo??esz by?? jedn?? z nich!"/>
      <SingleSection img={Main1} isVisible={sectionVisible.s2} id="2" text="Zarejestruj si?? ju?? teraz i korzystaj z naszych najlepszych tre??ci przygotowanych specjalnie dla Ciebie! Od student??w, dla student??w."/>
      <SingleSection img={Main2} isVisible={sectionVisible.s3} id="3" text="Fiszkando oferuje kompletny zbi??r pyta?? i funkcjonalno??ci. Potrzebujesz sprawdzi?? swoj?? wiedz??? Test 80 pyta?? lub pojedynczego pytania jest dla Ciebie. A mo??e chcesz mie?? wgl??d do wszystkich pyta?? i odpowiedzi? Baza pyta?? na pewno Ci si?? przyda."/>
      <SingleSection img={Main3} isVisible={sectionVisible.s4} id="4" text="Przyjazny u??ytkownikowi interfejs u??atwi ci zag????bienie si?? w ??wiat Fiszkando i u??atwi zdobywanie wiedzy potrzebnej do zaliczenia egzamin??w."/>
    </div>
  );
}
