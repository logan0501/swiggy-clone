import { useState } from "react";

const useInput = (validateInput, isPhone = false) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateInput(enteredValue);

  const valueIsInValid = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    if (isPhone) {
      if (e.target.value.length === 11) return;
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
