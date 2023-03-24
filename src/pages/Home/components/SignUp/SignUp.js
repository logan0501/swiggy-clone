import React, { useContext, useState } from "react";
import AuthMenubar from "../../../../components/AuthMenubar/AuthMenubar";
import MenuButton from "../../../../components/MenuButton/MenuButton";
import classes from "./SignUp.module.css";
import SignUpInputs from "./components/SignUpInputs";
import useInput from "../../../../hooks/use-input";
import ReactDom from "react-dom";
import BackDrop from "../../../../components/BackDrop/BackDrop";
import { createAccount } from "../../../../actions/firebaseAuthentication";
import { SUCCESS } from "../../../../constants/userCurrentLocationStatus";
import UserContext from "../../../../store/user-context";
import CircularProgress from "@mui/material/CircularProgress";
import { EMAIL, NAME, PHONE_NUMBER } from "../../../../constants/userInput";
import { inputValidator } from "../../../../utils/validator.general";

function SignUp(props) {
  const {
    enteredValue: signupPhoneNumber,
    valueIsValid: signupPhoneIsValid,
    setIsTouched: setSignupPhoneTouched,
    valueIsInValid: signupPhoneHasError,
    valueBlurHandler: signupPhoneBlurHandler,
    valueChangeHandler: signupPhoneChangeHandler,
    reset: signupPhoneReset,
  } = useInput((number) => inputValidator(PHONE_NUMBER, number), true);
  const {
    enteredValue: signupName,
    valueIsValid: signupNameIsValid,
    setIsTouched: signupNameIsTouched,
    valueIsInValid: signupNameHasError,
    valueBlurHandler: signupNameBlurHandler,
    valueChangeHandler: signupNameChangeHandler,
    reset: signupNameReset,
  } = useInput((name) => inputValidator(NAME, name));
  const {
    enteredValue: signupEmail,
    valueIsValid: signupEmailIsValid,
    setIsTouched: signupEmailIsTouched,
    valueIsInValid: signupEmailHasError,
    valueBlurHandler: signupEmailBlurHandler,
    valueChangeHandler: signupEmailChangeHandler,
    reset: signupEmailReset,
  } = useInput((email) => inputValidator(EMAIL, email));
  const signupPropObject = {
    signupPhoneNumber,
    signupPhoneIsValid,
    setSignupPhoneTouched,
    signupPhoneHasError,
    signupPhoneBlurHandler,
    signupPhoneChangeHandler,
    signupPhoneReset,
    signupName,
    signupNameIsValid,
    signupNameIsTouched,
    signupNameHasError,
    signupNameBlurHandler,
    signupNameChangeHandler,
    signupNameReset,
    signupEmail,
    signupEmailIsValid,
    signupEmailIsTouched,
    signupEmailHasError,
    signupEmailBlurHandler,
    signupEmailChangeHandler,
    signupEmailReset,
  };
  let formIsValid = false;
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const usercontext = useContext(UserContext);

  if (signupNameIsValid && signupPhoneIsValid && signupEmailIsValid)
    formIsValid = true;
  const signupButtonClickHandler = async () => {
    if (formIsValid) {
      setIsLoading(true);
      const response = await createAccount(
        signupName,
        signupEmail,
        signupPhoneNumber
      );
      signupResetHandler();
      if (response.status === SUCCESS) {
        usercontext.setUser(response.data);
        usercontext.setLoggedIn(true);
        props.closeMenu();
      } else {
        setHasError(response.error);
        setTimeout(() => {
          setHasError(false);
        }, 3000);
      }
      setIsLoading(false);
    } else {
      if (!signupPhoneIsValid) {
        setSignupPhoneTouched(true);
      }
      if (!signupNameIsValid) {
        signupNameIsTouched(true);
      }
      if (!signupEmailIsValid) {
        signupEmailIsTouched(true);
      }
    }
  };
  const signupResetHandler = () => {
    signupNameReset();
    signupEmailReset();
    signupPhoneReset();
  };
  return (
    <>
      <AuthMenubar
        menuStatus={props.menuStatus}
        onMenuChange={props.menuChangeHandler}
        onReset={signupResetHandler}
        onMenuClose={props.closeMenu}
        className={
          props.menuStatus === "signup" && props.showCard === true
            ? classes["home-login-container-active"]
            : ""
        }
        title="Sign Up"
        subtitle="login into your account"
      >
        <div>
          <SignUpInputs {...signupPropObject} />
          <p className={classes["referal-code"]}>Have a referal code?</p>
        </div>
        {hasError && <p className={classes.auth_error_text}>{hasError}</p>}
        <MenuButton onClick={signupButtonClickHandler}>
          {!isLoading ? (
            "CONTINUE"
          ) : (
            <CircularProgress size="1.2rem" style={{ color: "white" }} />
          )}
        </MenuButton>
        <p>
          By creating an account, I accept the
          <strong> Terms & Conditions</strong> & <strong>Privacy Policy</strong>
        </p>
      </AuthMenubar>
      {props.menuStatus === "signup" &&
        props.showCard === true &&
        ReactDom.createPortal(
          <BackDrop
            onCloseMenu={props.closeMenu}
            onReset={signupResetHandler}
          />,
          document.getElementById("body")
        )}
    </>
  );
}

export default SignUp;
