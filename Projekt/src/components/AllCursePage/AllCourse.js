import styles from './AllCourse.module.css';
import CourseCard from '../UI/CourseCard'
import zdjeice from '../../image/banner.jpg';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {positionActions} from "../../storage/redux-index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllCourse = (props) =>{
    const history = useNavigate();
    const courseId = useSelector((state) => state.autoCurseId);
    const [course, setCourse] = useState([]);
    const [selectedAnswearsIndexes, setSelectedAnswearIndexes] = useState();
    const dispatch=useDispatch();
    // ten useEffect pod spodem jest od Wiktora żeby sidebar dobrze działał. Najlepiej nie ruszać XD
    useEffect(() => {
        dispatch(positionActions.pagePositionChange(0));
      }, [dispatch]);
    const sendQuestion = useCallback(async () =>{
        try{
            const res = await fetch('http://localhost:8080/get-all-courses');
            const parseJSON = await res.json();
            const loadedCurse = [];
            for(const key in parseJSON){
                loadedCurse.push({
                    id: key,
                    name: parseJSON[key].name,
                    _id: parseJSON[key]._id,
                    school: parseJSON[key].school.name
                });
            }
            setCourse(loadedCurse);
        }catch(error){
            console.log(error);
        }
    },[]);

    const remeberIdCurseHandler = () =>{
        const now = new Date();
        let time = now.getTime();
        time += 3600 * 1000 * 24 * 365 * 1;
        now.setTime(time);
        document.cookie = `idCurse=${courseId.id}; expires=${now.toUTCString()}`;

    }
    useEffect(()=>{
        sendQuestion();
    },[sendQuestion]);

    const ChangeCurseHandler = () =>{
        return history(props.page);
    };

    const selectAnswearHandler = (index) => {
        setSelectedAnswearIndexes(indexID=>{
            if(index===indexID){
                return undefined;
            }else{
                return index;
            }
        });
    };

    const courseList = course.map((course) => (
        <CourseCard
            key={course._id}
            index = {course._id}
            logo={zdjeice}
            title={course.name}
            nameschool={course.school}
            id={course._id}
            funkcja={selectAnswearHandler}
            obecnyIndex = {selectedAnswearsIndexes}
        />
    ));
    return (
        <div className={styles.container}>
                <div className={styles.main_conatinerCard}>
                    {courseList}    
                </div>
                <div className={styles.main_remeberCurse}>
                    <div className={styles.remeberCurse}>
                        <p className={styles.remeber_p}>Zapamiętaj kurs</p>
                        <input className={styles.input_checkBox} type="checkbox" onChange={remeberIdCurseHandler} />
                    </div>
                    <div className={styles.remeberCurseBtn} onClick={ChangeCurseHandler}>
                        <p>Wybierz</p>
                    </div>
                </div>
        </div>
    );
};

export default AllCourse;