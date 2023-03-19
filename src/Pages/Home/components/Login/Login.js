import React, { useContext } from "react";
import AuthMenubar from "../../../../components/AuthMenubar/AuthMenubar";
import classes from "./Login.module.css";
import MenuButton from "../../../../components/MenuButton/MenuButton";
import LoginInputs from "./components/LoginInputs";
import useInput from "../../../../hooks/use-input";
import ReactDom from "react-dom";
import BackDrop from "../../../../components/BackDrop/BackDrop";
import { loginUserWithPhoneNumber } from "../../../../actions/firebaseAuthentication";
import {
  ERROR,
  SUCCESS,
} from "../../../../utils/constants/userCurrentLocationStatus";
import userContext from "../../../../store/user-context";

function Login(props) {
  const usercontext = useContext(userContext);
  const {
    enteredValue: loginPhoneNumber,
    valueIsValid: loginPhoneIsValid,
    setIsTouched: setLoginPhoneTouched,
    valueIsInValid: loginPhoneHasError,
    valueBlurHandler: loginPhoneBlurHandler,
    valueChangeHandler: loginPhoneChangeHandler,
    reset: loginPhoneReset,
  } = useInput((number) => number.length === 10, true);
  const phoneInput = {
    loginPhoneNumber,
    loginPhoneIsValid,
    setLoginPhoneTouched,
    loginPhoneHasError,
    loginPhoneBlurHandler,
    loginPhoneChangeHandler,
  };
  const loginButtonHandler = async () => {
    if (loginPhoneIsValid) {
      const res = await loginUserWithPhoneNumber(loginPhoneNumber);
      if (res.status === SUCCESS) {
        props.closeMenu();
        usercontext.setUser(res.data);
        usercontext.setLoggedIn(true);
        loginResetHandler();
      } else if (res.status === ERROR) {
        alert(res.error);
      }
    } else {
      setLoginPhoneTouched(true);
    }
  };
  const loginResetHandler = () => {
    loginPhoneReset();
  };
  return (
    <>
      <AuthMenubar
        menuStatus={props.menuStatus}
        onMenuChange={props.menuChangeHandler}
        onMenuClose={props.closeMenu}
        onReset={loginResetHandler}
        className={
          props.menuStatus === "login" && props.showCard === true
            ? classes["home-login-container-active"]
            : ""
        }
        title="Login"
        subtitle="create an account"
      >
        <LoginInputs {...phoneInput} />
        <MenuButton onClick={loginButtonHandler}>LOGIN</MenuButton>
        <p>
          By clicking on Login, I accept the
          <strong> Terms & Conditions</strong> &<strong>Privacy Policy</strong>
        </p>
      </AuthMenubar>
      {props.menuStatus === "login" &&
        props.showCard === true &&
        ReactDom.createPortal(
          <BackDrop
            onCloseMenu={props.closeMenu}
            onReset={loginResetHandler}
          />,
          document.getElementById("body")
        )}
    </>
  );
}

export default Login;
