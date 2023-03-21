import React from "react";
import classes from "./AccountHeader.module.css";
import { BsCheckCircleFill } from "react-icons/bs";
import { capitalizeString } from "../helpers/capitalizeString";

function AccountHeader(props) {
  const { user, isLoggedIn } = props;
  console.log(user, isLoggedIn);
  return (
    <>
      {!isLoggedIn ? (
        <header className={classes.account_header}>
          <h4>
            <strong>Account</strong>
          </h4>
          <p>
            To place your order now, log in to your existing account or sign up.
          </p>
        </header>
      ) : (
        <header className={classes.account_header}>
          <div className={classes.flex_row_container}>
            <h4>
              <strong>LoggedIn</strong>
            </h4>
            <BsCheckCircleFill color="#5FB246" />
          </div>
          <div>
            <h4 className={classes.user_details}>
              <strong>{`${capitalizeString(user.name)}  | ${
                user.phoneNumber
              }`}</strong>
            </h4>
          </div>
          <p></p>
        </header>
      )}
    </>
  );
}

export default AccountHeader;
