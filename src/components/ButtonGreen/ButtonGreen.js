import React from "react";
import classes from "./ButtonGreen.module.css";

function ButtonGreen(props) {
  return (
    <button
      className={classes.payment_button + " " + props.className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default ButtonGreen;
