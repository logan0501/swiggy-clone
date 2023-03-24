import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import ButtonGreen from "../../../../components/ButtonGreen/ButtonGreen";
import { useNavigate } from "react-router-dom";
import userContext from "../../../../store/user-context";

function Payment(props) {
  const { addressCheckOut, restaurant } = props;

  const { isLoggedIn } = useContext(userContext);

  const [UPIValue, setUPIValue] = useState("");
  const navigate = useNavigate();

  function upiChangeHandler(e) {
    setUPIValue(e.target.value);
  }

  const paymentHandler = () => {
    if (UPIValue.trim().length === 0) return;
    navigate("/payment-successful", {
      state: { restaurant },
    });
  };
  return (
    <div className={classes.payment_container}>
      <h4 className={classes.h4}>Payment</h4>
      {isLoggedIn && addressCheckOut && (
        <>
          <input
            type="text"
            placeholder="Enter Your UPI ID"
            className={classes.upid_input}
            value={UPIValue}
            onChange={upiChangeHandler}
          />
          <ButtonGreen
            className={classes.payment_button}
            onClick={paymentHandler}
          >
            MAKE PAYMENT
          </ButtonGreen>
        </>
      )}
    </div>
  );
}

export default Payment;
