import React, { Fragment } from "react";
import Login from "../../pages/Home/components/Login/Login";
import SignUp from "../../pages/Home/components/SignUp/SignUp";
import ReactDom from "react-dom";
import BackDrop from "../BackDrop/BackDrop";

function AuthMenuCard(props) {
  const { menuStatus, onMenuChange, showCard, onCloseMenu: closeMenu } = props;

  return (
    <Fragment>
      <Login
        menuStatus={menuStatus}
        menuChangeHandler={onMenuChange}
        showCard={showCard}
        closeMenu={closeMenu}
      />

      <SignUp
        menuStatus={menuStatus}
        menuChangeHandler={onMenuChange}
        showCard={showCard}
        closeMenu={closeMenu}
      />
    </Fragment>
  );
}

export default AuthMenuCard;
