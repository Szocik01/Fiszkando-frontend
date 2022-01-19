import styles from "./styles/MainPage.module.css";

import ListItem from "./ListItem";
import SearchBar from "../CoursesManager/SearchBar";

const MainPage = (props) => {
  return (
    <div className={`${styles.container}`}>
      <SearchBar />
      <ul className={styles["list-container"]}>
        {props.schoolsList.map((s) => (
          <ListItem
            name={s.name}
            id={s._id}
            key={s._id}
            moveHandler={props.showModifyHandler}
            passModifyData={props.passModifyData}
            filterHandler={props.filterHandler}
          />
        ))}
      </ul>
      <button className={styles.addBtn} onClick={props.leftMoveHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="2rem"
          viewBox="0 0 24 24"
          width="2rem"
          fill="white"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g />
            <g>
              <path d="M17,19.22H5V7h7V5H5C3.9,5,3,5.9,3,7v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-7h-2V19.22z" />
              <path d="M19,2h-2v3h-3c0.01,0.01,0,2,0,2h3v2.99c0.01,0.01,2,0,2,0V7h3V5h-3V2z" />
              <rect height="2" width="8" x="7" y="9" />
              <polygon points="7,12 7,14 15,14 15,12 12,12" />
              <rect height="2" width="8" x="7" y="15" />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default MainPage;
