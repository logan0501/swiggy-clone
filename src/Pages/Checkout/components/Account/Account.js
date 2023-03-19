import React, { Fragment, useContext, useState } from "react";
import classes from "./Account.module.css";
import {
  closeMenuCard,
  menuCardChangeHandler,
} from "../../../../utils/menuCard.handler";
import AuthMenuCard from "../../../../components/AuthMenuCard/AuthMenuCard";
import userContext from "../../../../store/user-context";
import AccountHeader from "./AccountHeader/AccountHeader";

function Account(props) {
  const [showCard, setShowCard] = useState(false);
  const [menuStatus, setMenuStatus] = useState("login");
  const { isLoggedIn, user } = useContext(userContext);

  const menuChangeHandler = (newchange) => {
    setMenuStatus(newchange);
    setShowCard(true);
    menuCardChangeHandler();
  };

  const closeMenuHandler = () => {
    setShowCard(false);
    closeMenuCard(setShowCard);
  };

  const loginButtonHandler = () => {
    menuChangeHandler("login");
    // createAccount("loganvk18@gmail.com", "123456");
  };
  const signUpButtonHandler = () => {
    menuChangeHandler("signup");
  };

  return (
    <Fragment>
      <section className={classes.account_section}>
        <div>
          <AccountHeader user={user} isLoggedIn={isLoggedIn} />
          {!isLoggedIn && (
            <div className={classes.buttons_container}>
              <div
                className={classes.button + " " + classes.button_light}
                onClick={loginButtonHandler}
              >
                <p>Have an account?</p>
                <h5>LOG IN</h5>
              </div>
              <div
                className={classes.button + " " + classes.button_dark}
                onClick={signUpButtonHandler}
              >
                <p>New to Swiggy?</p>
                <h5>SIGN UP</h5>
              </div>
            </div>
          )}
        </div>

        {!isLoggedIn && (
          <img
            height="140"
            width="147"
            alt=""
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r"
          />
        )}
      </section>
      <AuthMenuCard
        showCard={showCard}
        menuStatus={menuStatus}
        onMenuChange={menuChangeHandler}
        onCloseMenu={closeMenuHandler}
      />
    </Fragment>
  );
}

export default Account;
