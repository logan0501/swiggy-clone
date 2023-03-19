import React from "react";
import AuthMenubar from "../../../../components/AuthMenubar/AuthMenubar";
import MenuButton from "../../../../components/MenuButton/MenuButton";
import classes from "./SignUp.module.css";
import SignUpInputs from "./components/SignUpInputs";
import useInput from "../../../../hooks/use-input";
import ReactDom from "react-dom";
import BackDrop from "../../../../components/BackDrop/BackDrop";
import { createAccount } from "../../../../actions/firebaseAuthentication";
import { SUCCESS } from "../../../../utils/constants/userCurrentLocationStatus";

function SignUp(props) {
  const {
    enteredValue: signupPhoneNumber,
    valueIsValid: signupPhoneIsValid,
    setIsTouched: setSignupPhoneTouched,
    valueIsInValid: signupPhoneHasError,
    valueBlurHandler: signupPhoneBlurHandler,
    valueChangeHandler: signupPhoneChangeHandler,
    reset: signupPhoneReset,
  } = useInput((number) => number.length === 10, true);
  const {
    enteredValue: signupName,
    valueIsValid: signupNameIsValid,
    setIsTouched: signupNameIsTouched,
    valueIsInValid: signupNameHasError,
    valueBlurHandler: signupNameBlurHandler,
    valueChangeHandler: signupNameChangeHandler,
    reset: signupNameReset,
  } = useInput((name) => name.trim() !== "");
  const {
    enteredValue: signupEmail,
    valueIsValid: signupEmailIsValid,
    setIsTouched: signupEmailIsTouched,
    valueIsInValid: signupEmailHasError,
    valueBlurHandler: signupEmailBlurHandler,
    valueChangeHandler: signupEmailChangeHandler,
    reset: signupEmailReset,
  } = useInput(
    (email) => email.trim() !== "" && email.includes("@") && email.includes(".")
  );
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
  if (signupNameIsValid && signupPhoneIsValid && signupEmailIsValid)
    formIsValid = true;
  const signupButtonClickHandler = async () => {
    if (formIsValid) {
      props.closeMenu();
      const response = await createAccount(
        signupName,
        signupEmail,
        signupPhoneNumber
      );
      signupResetHandler();
      if (response.status === SUCCESS) {
        alert("Account created successfully");
      }
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
        <MenuButton onClick={signupButtonClickHandler}>CONTINUE</MenuButton>
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
