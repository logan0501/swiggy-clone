import React from "react";
import classes from "./ViewCart.module.css";

function ViewCart(props) {
  const { length, totalAmount } = props;

  return (
    <div
      className={`${classes.bottom_cart_container} ${
        length >= 1 ? classes.bottom_cart_container_active : ""
      }`}
    >
      <h4>{`${length} ${
        length === 1 ? "item" : "items"
      } | ₹${totalAmount}`}</h4>
      <button className={classes.view_cart_btn} onClick={props.onViewCart}>
        VIEW CART
      </button>
    </div>
  );
}

export default ViewCart;
