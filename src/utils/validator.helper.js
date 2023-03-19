import { EMAIL, NAME, PHONE_NUMBER } from "./constants/validator";

const validate = (value, type) => {
  switch (type) {
    case PHONE_NUMBER:
      return isPhoneNumberValid(value);
      break;
    case EMAIL:
      return isValidEmail(value);
      break;
    case NAME:
      return isNotEmpty(value);
      break;
  }
};

const isPhoneNumberValid = (value) => {
  return value.trim().length !== 0;
};
const isValidEmail = (value) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;

  return value.match(emailRegex) != null;
};

const isNotEmpty = (value) => {
  return value.trim().length !== 0;
};
