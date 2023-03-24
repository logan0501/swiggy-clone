import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../store/user-context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./PaymenSuccessful.module.css";
import { BsCheckCircle } from "react-icons/bs";
import cartContext from "../../store/cart-context";
import { AiFillHome } from "react-icons/ai";
import {map} from "lodash";

function PaymentSuccessful(props) {
  const { isLoggedIn, user } = useContext(UserContext);
  const { name: userName, phoneNumber } = user;
  const navigate = useNavigate();
  const [progressLoading, setProgressLoading] = useState(true);
  const { items, totalAmount } = useContext(cartContext);
  const {
    state: { restaurant },
  } = useLocation();
  const { name: restaurantName, areaName } = restaurant;
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(-1);
      alert("Kindly login before payment");
    }
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {
        <div className={classes.progress_container}>
          {progressLoading ? (
            <CircularProgress size="4rem" />
          ) : (
            <div className={classes.payment_success_icon_container}>
              <BsCheckCircle
                size="4rem"
                color="#217ad2"
                className={classes.payment_success_icon}
              />
              <h4>Payment Successfull</h4>
            </div>
          )}
        </div>
      }
      {!progressLoading && (
        <>
          <div className={classes.bill_details}>
            <header className={classes.bill_header}>
              <h4>{restaurantName}</h4>
              <p>{areaName}</p>
            </header>
            <p>{userName}</p>
            <p>{phoneNumber}</p>
            <hr />
            <ul className={classes.food_item_container}>
              <li className={classes.food_item_header}>
                <span>S.No</span>
                <span>Name</span>
                <span>Qty</span>
                <span>Cost</span>
              </li>
              {map(items,(item, index) => {
                return (
                  <li className={classes.food_item} key={item.name}>
                    <span>{index + 1}.</span>
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                    <span>₹{item.quantity * item.price}</span>
                  </li>
                );
              })}
            </ul>
            <hr />
            <div className={classes.total_amount_container}>
              <h4>Total Amount</h4>
              <h4>₹{totalAmount}</h4>
            </div>
            <Link to="/" replace className={classes.order_more_link}>
              <span>Click here to order More</span>
              <AiFillHome />
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default PaymentSuccessful;
