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
      <SingleSection first={true} isVisible={sectionVisible.s1} id="1" text="Fiszkando to zbiór wiedzy potrzebnej każdemu studentowi do zdania sesji. Dzięki Fiszkando już ponad 100 osób zdało sesję z wyjątkowo trudnych przedmiotów. Możesz być jedną z nich!"/>
      <SingleSection img={Main1} isVisible={sectionVisible.s2} id="2" text="Zarejestruj się już teraz i korzystaj z naszych najlepszych treści przygotowanych specjalnie dla Ciebie! Od studentów, dla studentów."/>
      <SingleSection img={Main2} isVisible={sectionVisible.s3} id="3" text="Fiszkando oferuje kompletny zbiór pytań i funkcjonalności. Potrzebujesz sprawdzić swoją wiedzę? Test 80 pytań lub pojedynczego pytania jest dla Ciebie. A może chcesz mieć wgląd do wszystkich pytań i odpowiedzi? Baza pytań na pewno Ci się przyda."/>
      <SingleSection img={Main3} isVisible={sectionVisible.s4} id="4" text="Przyjazny użytkownikowi interfejs ułatwi ci zagłębienie się w świat Fiszkando i ułatwi zdobywanie wiedzy potrzebnej do zaliczenia egzaminów."/>
    </div>
  );
}
