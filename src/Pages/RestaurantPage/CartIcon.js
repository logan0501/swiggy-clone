import React from 'react';
import classes from "./CartIcon.module.css";

function CartIcon(props) {
    return <span className={`${classes.cart_icon_container} `} onClick={props.onClick}>
        <svg viewBox="-1 0 37 32" height="20" width="20"
             className={`${classes.cart_icon} ${props.count > 0 ? classes.cart_icon_active : ""}`}>
        <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
    </svg>
        <span
            className={`${classes.cart_icon_count} ${props.count > 0 ? classes.cart_icon_count_active : ""}`}>{props.count ?? 0}</span>
    </span>;
}

export default CartIcon;