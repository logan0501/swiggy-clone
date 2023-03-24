import React from "react";
import MenuInput from "../../../../../components/MenuInput/MenuInput";
import classes from "./SignUpInputs.module.css";

function SignUpInputs(props) {
  const {
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
  } = props;

  return (
    <div>
      <MenuInput
        title="Phone Number"
        type="tel"
        onChange={signupPhoneChangeHandler}
        onBlur={signupPhoneBlurHandler}
        value={signupPhoneNumber}
        displayErrorText={signupPhoneHasError}
        errorText={"Enter your Phone Number"}
        className={classes["bottom-border-ip"]}
      />
      <MenuInput
        title="Name"
        type="text"
        onChange={signupNameChangeHandler}
        onBlur={signupNameBlurHandler}
        value={signupName}
        displayErrorText={signupNameHasError}
        errorText={"Enter your Name"}
        className={classes["bottom-border-ip"]}
      />
      <MenuInput
        title="Email"
        className={classes["bottom-border-ip"]}
        type="email"
        onChange={signupEmailChangeHandler}
        onBlur={signupEmailBlurHandler}
        value={signupEmail}
        displayErrorText={signupEmailHasError}
        errorText={"Invalid Email address"}
      />
    </div>
  );
}

export default SignUpInputs;
