import styles from './Notification.module.css';
import { Link, useLocation } from "react-router-dom";
import Circe from '../components/formComponents/Circle';
import stylesCirce from '../components/formComponents/Circle.module.css';

const Notification = () =>{
    const { search } = useLocation();
    const status = new URLSearchParams(search).get('mode');
    console.log(status);
    let info;
    if(+status===200){
        info ='Wiadomość została wysłana na E-Mail';
    }else if(+status===202){
        info = 'Hasło zostało poprawnie zmienione';
    }else if(+status===400){
        info = 'Niepoprawny token lub token wygasł';
    }else{
        info = 'Nie znaleziono użytkownika z podanym id';
    }

    return(
        <div className={styles.container}>
            <Circe />
            <Circe className={stylesCirce.circe1}/>
            <Circe className={stylesCirce.circe2}/>
            <Circe className={stylesCirce.circe3}/>
            <Circe className={stylesCirce.circe4}/>
            <Circe className={stylesCirce.circe5}/>
            <Circe className={stylesCirce.circe6}/>
            <Circe className={stylesCirce.circe7}/>
            <Circe className={stylesCirce.circe8}/>
            <Circe className={stylesCirce.circe9}/>
            <div className={styles.container_box}>
                <div className={styles.box_paragraf}>
                    <h1>{info}</h1>
                </div>
                <div className={styles.box_button}>
                    <Link to="/authentication" className={styles.submit_btn}>
                        Wróć do strony głównej
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Notification;