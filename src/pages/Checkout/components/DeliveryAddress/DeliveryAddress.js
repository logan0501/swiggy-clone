import React, { useContext, useState } from "react";
import classes from "./DeliveryAddress.module.css";
import userContext from "../../../../store/user-context";
import ButtonGreen from "../../../../components/ButtonGreen/ButtonGreen";
import { size, trim } from "lodash";

let displayAddress = "";

function DeliveryAddress(props) {
  const { isLoggedIn } = useContext(userContext);
  const [address, setAddress] = useState("");
  const addressOnChangeHandler = (e) => {
    setAddress(e.target.value);
  };
  const addressSubmitHandler = () => {
    if (size(trim(address)) === 0) return;
    props.onDeliveryAddressAdded(true);
    displayAddress = address;
    setAddress("");
  };
  return (
    <div className={classes.delivery_address_container}>
      <h4 className={classes.h4}>Delivery Address</h4>
      {(isLoggedIn || props.addressCheckOut) && (
        <>
          <textarea
            className={classes.address}
            rows="5"
            cols="40"
            value={address}
            onChange={addressOnChangeHandler}
          ></textarea>
          <ButtonGreen
            className={classes.save_button}
            onClick={addressSubmitHandler}
          >
            SAVE AND PROCEED PAYMENT
          </ButtonGreen>
        </>
      )}

      {props.addressCheckOut && displayAddress.length > 0 && (
        <>
          <p>Address:</p>
          <p className={classes.address_para}>{displayAddress}</p>
        </>
      )}
    </div>
  );
}

export default DeliveryAddress;
