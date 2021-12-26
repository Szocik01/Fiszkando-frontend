import styles from './SingleCoustions.module.css';
import ContainerCard from '../components/UI/ContainerCard';
import logo from '../image/banner.jpg';

const SingleCoustions = () =>{
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.managerContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#000000"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                </div>
                <div className={styles.titleContainer}>
                    <ContainerCard 
                        title="Czy masło zda Studia?"
                        image={logo}
                        foto="true"
                    />
                </div>
                <div className={styles.couestionsContener}>
                    <ContainerCard 
                        title="A - Tak"
                        image={logo}
                        foto="true"
                    />
                    <ContainerCard 
                        title="B - Nie"
                        image={logo}
                        foto="true"
                    />
                    <ContainerCard 
                        title="C - Tak na 100%"
                        image={logo}
                        foto="false"
                    />
                    <ContainerCard 
                        title="D - Chuj to wiiiiiii"
                        image={logo}
                        foto="false"
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleCoustions;