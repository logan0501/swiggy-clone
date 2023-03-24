import React, { useContext, useState } from "react";
import AuthMenubar from "../../../../components/AuthMenubar/AuthMenubar";
import classes from "./Login.module.css";
import MenuButton from "../../../../components/MenuButton/MenuButton";
import LoginInputs from "./components/LoginInputs";
import userContext from "../../../../store/user-context";
import { loginUserWithPhoneNumber } from "../../../../actions/firebaseAuthentication";
import {
  ERROR,
  SUCCESS,
} from "../../../../constants/userCurrentLocationStatus";
import useInput from "../../../../hooks/use-input";
import CircularProgress from "@mui/material/CircularProgress";
import ReactDom from "react-dom";
import BackDrop from "../../../../components/BackDrop/BackDrop";
import { inputValidator } from "../../../../utils/validator.general";
import { PHONE_NUMBER } from "../../../../constants/userInput";

function Login(props) {
  const usercontext = useContext(userContext);
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    enteredValue: loginPhoneNumber,
    valueIsValid: loginPhoneIsValid,
    setIsTouched: setLoginPhoneTouched,
    valueIsInValid: loginPhoneHasError,
    valueBlurHandler: loginPhoneBlurHandler,
    valueChangeHandler: loginPhoneChangeHandler,
    reset: loginPhoneReset,
  } = useInput((number) => inputValidator(PHONE_NUMBER, number), true);

  const phoneInput = {
    loginPhoneNumber,
    loginPhoneIsValid,
    setLoginPhoneTouched,
    loginPhoneHasError,
    loginPhoneBlurHandler,
    loginPhoneChangeHandler,
  };
  const loginButtonHandler = async () => {
    setIsLoading(true);
    if (loginPhoneIsValid) {
      const res = await loginUserWithPhoneNumber(loginPhoneNumber);
      if (res.status === SUCCESS) {
        props.closeMenu();
        usercontext.setUser(res.data);
        usercontext.setLoggedIn(true);
        loginResetHandler();
      } else if (res.status === ERROR) {
        setHasError(res.error);
        setTimeout(() => {
          setHasError(false);
        }, 3000);
      }
    } else {
      setLoginPhoneTouched(true);
    }
    setIsLoading(false);
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
        {hasError && <p className={classes.auth_error_text}>{hasError}</p>}
        <MenuButton onClick={loginButtonHandler}>
          {!isLoading ? (
            "LOGIN"
          ) : (
            <CircularProgress size="1.2rem" style={{ color: "white" }} />
          )}
        </MenuButton>
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
