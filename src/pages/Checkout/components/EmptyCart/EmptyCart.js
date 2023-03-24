import React from "react";
import classes from "./EmptyCart.module.css";
import { useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigation = useNavigate();
  const redirectBtnHandler = () => {
    navigation("/", { replace: true });
  };
  return (
    <section className={classes.empty_container}>
      <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" />
      <h4>YOUR CART IS EMPTY.</h4>
      <p>You can go to home page to view more restaurants.</p>
      <button
        className={classes.home_redirect_btn}
        onClick={redirectBtnHandler}
      >
        SEE RESTAURANTS NEAR YOU
      </button>
    </section>
  );
}

export default EmptyCart;
