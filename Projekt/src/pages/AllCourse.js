import styles from './AllCourse.module.css';
import CourseCard from '../components/UI/CourseCard'
import zdjeice from '../image/banner.jpg'
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {positionActions} from "../storage/redux-index";

const AllCourse = () =>{
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
            const loadedMeals = [];
            for(const key in parseJSON){
                loadedMeals.push({
                    id: key,
                    name: parseJSON[key].name,
                    _id: parseJSON[key]._id,
                    school: parseJSON[key].school.name
                });
            }
            setCourse(loadedMeals);
        }catch(error){
            console.log(error);
        }
    },[]);

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
        </div>
    );
};

export default AllCourse;