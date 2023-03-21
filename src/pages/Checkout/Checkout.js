import React, { Fragment, useContext, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import classes from "./Checkout.module.css";
import Account from "./components/Account/Account";
import DeliveryAddress from "./components/DeliveryAddress/DeliveryAddress";
import Payment from "./components/Payment/Payment";
import { SlLocationPin } from "react-icons/sl";
import SwiggySigninIcon from "../../assets/SwiggySigninIcon";
import { FaMoneyCheckAlt } from "react-icons/fa";
import CartDetails from "./components/CartDetails/CartDetails";
import { useLocation } from "react-router-dom";
import cartContext from "../../store/cart-context";
import EmptyCart from "./components/EmptyCart/EmptyCart";

function Checkout(props) {
  const { state } = useLocation();
  const { restaurantDetails: restaurant } = state.restaurant;
  const [isDeliveryAddressAdded, setDeliveryAddressAdded] = useState(false);
  const deliveryAddressHandler = (newValue) => {
    setDeliveryAddressAdded(newValue);
  };

  const cartCtx = useContext(cartContext);
  return (
    <Fragment>
      <Navbar />
      {cartCtx.items.length === 0 && <EmptyCart />}
      {cartCtx.items.length !== 0 && (
        <section className={classes.checkout_section}>
          <div className={classes.checkout_process}>
            <div className={classes.process_container}>
              <div className={classes.dotted_line}></div>
              <span className={classes.process_icon_selected}>
                <SwiggySigninIcon fill="white" />
              </span>
              <Account />
            </div>
            <div className={classes.process_container}>
              <div className={classes.dotted_line}></div>

              <span className={classes.process_icon}>
                <SlLocationPin />
              </span>
              <DeliveryAddress
                onDeliveryAddressAdded={deliveryAddressHandler}
                addressCheckOut={isDeliveryAddressAdded}
              />
            </div>
            <div className={classes.process_container}>
              <span className={classes.process_icon}>
                <FaMoneyCheckAlt />
              </span>
              <Payment addressCheckOut={isDeliveryAddressAdded} />
            </div>
          </div>
          <CartDetails restaurant={restaurant} />
        </section>
      )}
    </Fragment>
  );
}

export default Checkout;
