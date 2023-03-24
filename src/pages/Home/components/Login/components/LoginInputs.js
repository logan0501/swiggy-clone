import React from "react";
import MenuInput from "../../../../../components/MenuInput/MenuInput";

function LoginInputs(props) {
  const {
    loginPhoneNumber,
    loginPhoneIsValid,
    setLoginPhoneTouched,
    loginPhoneHasError,
    loginPhoneBlurHandler,
    loginPhoneChangeHandler,
  } = props;
  return (
    <MenuInput
      title="Phone Number"
      type="tel"
      onChange={loginPhoneChangeHandler}
      value={loginPhoneNumber}
      displayErrorText={loginPhoneHasError}
      onBlur={loginPhoneBlurHandler}
      errorText={"Enter your Phone Number"}
    />
  );
}

export default LoginInputs;
