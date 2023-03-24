import { useState } from "react";
import { checkPhoneInputIsValid } from "../utils/validator.general";

const useInput = (validateInput, isPhone = false) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateInput(enteredValue);
  const valueIsInValid = !valueIsValid && isTouched;
  const valueChangeHandler = (e) => {
    if (isPhone) {
      const enteredPhone = e.target.value;
      if (!checkPhoneInputIsValid(enteredPhone)) return;
      setEnteredValue(e.target.value);
      setIsTouched(false);
    } else setEnteredValue(e.target.value);
  };
  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    enteredValue,
    valueIsValid,
    valueIsInValid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
    setIsTouched,
  };
};
export default useInput;
