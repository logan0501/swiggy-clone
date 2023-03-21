const signUpInitialState = {
  phoneNumber: "",
  name: "",
  email: "",
  phoneNumberIsValid: null,
  nameIsValid: null,
  emailIsValid: null,
};
const loginInitialState = {
  phoneNumber: "",
  phoneNumberIsValid: null,
};
const loginInputReducer = (state, action) => {
  console.log(action);
  if (action.type === "LOGIN_PHONE_NUMBER") {
    return {
      ...state,
      phoneNumber: action.phoneNumber,
    };
  }
  return loginInitialState;
};
export { loginInputReducer, signUpInitialState, loginInitialState };
