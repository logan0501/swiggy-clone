import {
  EMAIL,
  NAME,
  PHONE_NUMBER,
  PHONE_NUMBER_REGEX,
} from "./constants/validator";

function checkNumberOnly(value) {
  return PHONE_NUMBER_REGEX.test(value);
}

function checkPhoneInputIsValid(value) {
  console.log(value);
  return value.length === 0 || checkNumberOnly(value);
}

function checkPhoneNumberValidity(value) {
  return value.length === 10;
}

function checkEmailValidity(value) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return value.match(emailRegex) !== null;
}

function checkIsNotEmpty(value) {
  return value.trim().length !== 0;
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
