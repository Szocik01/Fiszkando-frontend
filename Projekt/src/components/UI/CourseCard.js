import styles from './CourseCard.module.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthCurseId } from "../../storage/redux-index";
import { useDispatch } from "react-redux";
const CourseCard = (props) =>{

    const history = useNavigate();
    const dispatch = useDispatch();
    const [moveBackDrop, setMoveBackDrop] = useState(false);
    const moveHandelr = () =>{
        setMoveBackDrop(true);
    }
    const offBackDrop = () =>{
        setMoveBackDrop(false);
    }
    const RedirectionHandler = () =>{
        dispatch(
            AuthCurseId.IndetificationCurseId({
                id: props.id
            })
          );
        return history(`/singleCoustions`);
    }
    return (
        <div className={styles.container} onMouseLeave={offBackDrop}>
            <div onClick={RedirectionHandler} className={`${styles.backdrop} ${moveBackDrop&&styles.backdropMove}`}>
               <p>WYBIERZ</p>
            </div>
            <div className={styles.mainCard} onMouseMove={moveHandelr}>
                <div className={styles.image}>
                    <img src={props.logo} alt='logo' />
                </div>
                <div className={styles.title}>
                    <p>{props.title}</p>
                </div>
                <div className={styles.info}>
                    <p>{props.nameschool}</p>
                </div>
            </div>
        </div>
    );
};
export default CourseCard;