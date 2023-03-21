import classes from "./MenuInput.module.css";
import React from "react";

const MenuInput = (props) => {
  return (
    <div className={classes["ip-container"] + " " + props.className}>
      {!props.displayErrorText ? (
        <p className={classes["ip-title"]}>{props.title}</p>
      ) : (
        <p className={classes.error_text}>{props.errorText}</p>
      )}
      <input
        type={props.type}
        className={classes["login-phone-ip"]}
        onChange={props.onChange}
        value={props?.value ?? ""}
        onBlur={props?.onBlur}
        maxLength={props?.maxLength ?? 100}
      />
    </div>
  );
};

export default MenuInput;
