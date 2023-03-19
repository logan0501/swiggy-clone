import LoginInputs from "../../Pages/Home/components/Login/components/LoginInputs";
import SignUpInputs from "../../Pages/Home/components/SignUp/components/SignUpInputs";

export const LOGIN_CARD = {
  title: "Login",
  subtitle: "create an account",
  inputs: <LoginInputs />,
  buttonText: "LOGIN",
  paragraphText: (
    <p>
      By clicking on Login, I accept the
      <strong> Terms & Conditions</strong> &<strong>Privacy Policy</strong>
    </p>
  ),
};

export const SIGNUP_CARD = {
  title: "Sign Up",
  subtitle: "login into your account",
  inputs: <SignUpInputs />,
  buttonText: "CONTINUE",
  paragraphText: (
    <p>
      By creating an account, I accept the
      <strong> Terms & Conditions</strong> & <strong>Privacy Policy</strong>
    </p>
  ),
};
