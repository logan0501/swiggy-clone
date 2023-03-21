import classes from "./MenuButton.module.css";

const MenuButton = (props) => {
    return (
        <button className={classes["login-btn"] + " " + props.className} onClick={props.onClick}>
            {props.children}
        </button>
    );
};
export default MenuButton;
