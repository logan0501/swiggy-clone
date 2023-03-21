import classes from "./BackDrop.module.css";

export default function BackDrop(props) {
  const closeHandler = () => {
    props.onCloseMenu();
    props.onReset();
  };
  return <div onClick={closeHandler} className={classes.overlay}></div>;
}
