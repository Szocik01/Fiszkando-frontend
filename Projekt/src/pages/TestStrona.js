import CourseCard from '../components/UI/CourseCard';
import styles from './TestStrona.module.css';
import image from '../image/banner.jpg';

const TestStrona = () =>{
    return (
        <div className={styles.container}>
            <CourseCard 
                logo = {image}
                title= "sieci"
                info ="coś tam Masło je sobie i ma wyjebane"
            />

        </div>
    );
};

export default TestStrona;