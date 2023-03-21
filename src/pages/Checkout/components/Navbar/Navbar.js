import React, { useContext, useState } from "react";
import SwiggyLogo from "../../../../assets/SwiggyLogo";
import classes from "./Navbar.module.css";
import SwiggyHelpIcon from "../../../../assets/SwiggyHelpIcon";
import SwiggySigninIcon from "../../../../assets/SwiggySigninIcon";
import { CiUser } from "react-icons/ci";
import userContext from "../../../../store/user-context";
import { BiLogOutCircle } from "react-icons/bi";
import CircularProgress from "@mui/material/CircularProgress";

function Navbar(props) {
  const [isLoading, setLoading] = useState(false);
  const usercontext = useContext(userContext);
  const logoutHandler = () => {
    setLoading(true);
    setTimeout(() => {
      usercontext.setLoggedIn(false);
      setLoading(false);
    }, 3000);
  };
  return (
    <nav>
      <ul className={classes.nav}>
        <li className={classes.nav_brand}>
          <SwiggyLogo />
          <p>
            <strong>SECURE CHECKOUT</strong>
          </p>
        </li>
        <li className={classes.nav_items}>
          <span className={classes.nav_item}>
            <SwiggyHelpIcon /> Help
          </span>

          {!isLoading && usercontext.isLoggedIn && (
            <>
              <span className={classes.nav_item}>
                <CiUser /> {usercontext.user.name}
              </span>
              <span className={classes.nav_item} onClick={logoutHandler}>
                <BiLogOutCircle /> Log out
              </span>
            </>
          )}
          {isLoading && <CircularProgress />}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
