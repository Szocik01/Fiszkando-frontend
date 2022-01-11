import styles from './AllCourse.module.css';
import CourseCard from '../components/UI/CourseCard'
import zdjeice from '../image/banner.jpg'
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {positionActions} from "../storage/redux-index";
import { useSelector } from "react-redux";

const AllCourse = () =>{
    const courseId = useSelector((state) => state.autoCurseId);
    const [course, setCourse] = useState([]);
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


    const courseList = course.map((course) => (
        <CourseCard
            key={course._id}
            logo={zdjeice}
            title={course.name}
            nameschool={course.school}
            id={course._id}
        />
    ));
    return (
        <div className={styles.container}>
            {courseList}
            <div className={styles.remeberCurse}>
                <input type="checkbox" onChange={remeberIdCurseHandler} />
                <p>Zaznacz</p>
            </div>
        </div>
    );
};

export default AllCourse;