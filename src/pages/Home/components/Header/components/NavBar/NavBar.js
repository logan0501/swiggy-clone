import classes from "./NavBar.module.css";
import swiggyLogo from "./swiggy-logo.png";
import { useContext } from "react";
import UserContext from "../../../../../../store/user-context";
import { capitalizeString } from "../../../../../Checkout/components/Account/helpers/capitalizeString";

export default function NavBar(props) {
  const { user, isLoggedIn } = useContext(UserContext);
  const openLoginMenu = (e) => {
    e.preventDefault();
    props.onMenuChange("login");
  };
  const openSignupMenu = (e) => {
    e.preventDefault();
    props.onMenuChange("signup");
  };
  return (
    <nav>
      <img src={swiggyLogo} alt="" width="180" />
      {!isLoggedIn ? (
        <span>
          <a className={classes.login} onClick={openLoginMenu} href="/">
            Login
          </a>
          <span className={classes["sign-up"]} onClick={openSignupMenu}>
            <a href="/">Sign up</a>
          </span>
        </span>
      ) : (
        <h4>{capitalizeString(user.name)} </h4>
      )}
    </nav>
  );
}
