import style from "./SingleSection.module.css";

export default function SingleSection(props) {
  return (
    <div className={`${style.sectionContainer} ${props.isVisible ? style.visible : ""}`} id={props.id}>
      <div className={style.textContainer}>{props.text}</div>
      {!props.first ? (
        <img
          alt="Photo has not loaded"
          src={props.img}
          className={style.image}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="12rem"
          viewBox="0 0 24 24"
          width="12rem"
          fill="#00640A">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
        </svg>
      )}
    </div>
  );
}
