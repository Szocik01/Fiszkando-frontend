import style from "./CoursesContainer.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import SingleCard from "./SingleCard";
import { useEffect,useCallback, useState, Fragment } from "react";
import BasketItem from "./BasketItem";

export default function CoursesContainer(props)
{ 
  const [coursesList,setCoursesList]=useState([]);
  const [showBasket, setShowBasket]=useState(false);
  const [basketItems,setBasketItems]=useState([]);


  const{setIsCourses,setHttpError,setIsSpinnerActive,isSpinnerActive,isCourses,setCourse,university,basketData}=props;

  const getCourses = useCallback(async () => {
    try {
      setIsSpinnerActive(true);
      const response = await fetch("http://localhost:8080/get-all-courses",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ schoolId: university})
      });
      if (!response.ok) {
        throw new Error("Nieoczekiwany błąd serwera");
      }
      const data = await response.json();
      console.log(data);
      setCoursesList(data.map((item)=>{
        return <SingleCard
        isCourses={true}
        setCourse={setCourse}
        key={item._id}
        id={item._id}
        name={item.name}
        price={item.price}
        universityName={item.school.name}
        />
      }));
      setIsSpinnerActive(false);
    } catch (error) {
      setHttpError(error.message);
      setIsSpinnerActive(false);
    }
  }, [setHttpError, setIsSpinnerActive,university]);
  
    function showBasketHandler()
    {
      setShowBasket(true);
    }

    function closeBasketHandler()
    {
      setShowBasket(false);
    }

    function hideForm()
    {
      setIsCourses(false);        
    }

    useEffect(()=>{
      setBasketItems(basketData.items.map((item)=>{
        return <BasketItem 
        courseName={item.name}
        price={item.price}
        id={item.id}
        key={item.id}
        />
      }))
    },[basketData,setBasketItems])

    useEffect(()=>{
      getCourses()
    },[getCourses]);
    
    return <div className={`${style.coursesContainer} ${isCourses && style.visible}`}>
        {isSpinnerActive && <LoadingSpinner/>}
        {!isSpinnerActive && <Fragment>
          <div className={style.buttonContainer}>
          <div className={style.basket} onClick={showBasketHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8L14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            Koszyk
            <div className={style.itemsCount}>{basketData.items.length}</div>
          </div>
          <button type="button" onClick={hideForm} className={style.returnButton}>
            Powrót
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2rem"
              viewBox="0 0 24 24"
              width="2rem"
              fill="white">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </button>
        </div>
        {showBasket && <div className={style.basketDisplay}>
          <div className={style.header} onClick={closeBasketHandler}>Zamknij <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></div>
          <div className={style.itemsList}>
            {basketItems}
          </div>
          <div className={style.footer}>Razem: {basketData.price} zł
          <div className={style.confirmPurchase}>Zapłać</div>
          </div>
        </div>}
        {coursesList}
        </Fragment>}
    </div>
}