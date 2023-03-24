import {
  EMAIL,
  EMAIL_REGEX,
  NAME,
  PHONE_NUMBER,
  PHONE_NUMBER_REGEX,
} from "../constants/userInput";
import { size, trim } from "lodash";

function checkNumberOnly(value) {
  if (PHONE_NUMBER_REGEX.test(value)) {
    return true;
  } else {
    return false;
  }
}

function checkPhoneInputIsValid(value) {
  return (
    size(trim(value)) === 0 || (checkNumberOnly(value) && size(value) <= 10)
  );
}

function checkPhoneNumberValidity(value) {
  return size(value) === 10;
}

function checkEmailValidity(value) {
  return EMAIL_REGEX.test(value);
}

function checkIsNotEmpty(value) {
  return size(trim(value)) !== 0;
}

const inputValidator = (inputType, value) => {
  switch (inputType) {
    case PHONE_NUMBER:
      return checkPhoneNumberValidity(value);
      break;
    case EMAIL:
      return checkEmailValidity(value);
      break;
    case NAME:
      return checkIsNotEmpty(value);
      break;
  }
};

export { inputValidator, checkPhoneInputIsValid };
