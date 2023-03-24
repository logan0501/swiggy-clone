import React, { useContext, useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import classes from "./RestaurantSearchbar.module.css";
import SwiggyLogo from "../../../../assets/SwiggyLogo";
import CartIcon from "../../CartIcon";
import CartContext from "../../../../store/cart-context";
import { useNavigate } from "react-router-dom";
import userContext from "../../../../store/user-context";
import { BiLogOutCircle } from "react-icons/bi";
import CircularProgress from "@mui/material/CircularProgress";

export default function RestaurantSearchbar(props) {
  const { restaurant: restaurantMenu } = props;
  const cartCtx = useContext(CartContext);
  const [isLoading, setLoading] = useState(false);
  const usercontext = useContext(userContext);
  const navigation = useNavigate();
  const viewCartHandler = () => {
    navigation("/check-out", {
      state: {
        restaurant: restaurantMenu,
      },
    });
  };
  const logoutHandler = () => {
    setLoading(true);
    setTimeout(() => {
      usercontext.setLoggedIn(false);
      setLoading(false);
    }, 3000);
  };
  return (
    <React.Fragment>
      <nav>
        <ul className={classes.restaurant_search__nav}>
          <span className={classes.restaurant_search__brand}>
            <SwiggyLogo className={classes.swiggy_logo} />
            <button className={classes.restaurant_search__location}>
              <span>Other</span>
              <div>
                Coimbatore, Tamil Nadu, India
                <RxChevronDown
                  className={classes.restaurant_search__drop_icon}
                />
              </div>
            </button>
          </span>
          <div className={classes.restaurant_search__items}>
            <li>
              <AiOutlineSearch /> Search
            </li>

            <li onClick={viewCartHandler} style={{ cursor: "pointer" }}>
              <CartIcon count={cartCtx.items.length} /> Cart
            </li>
            {!isLoading && usercontext.isLoggedIn && (
              <>
                <li>
                  <CiUser /> {usercontext.user.name}
                </li>
                <li onClick={logoutHandler}>
                  <BiLogOutCircle /> Log out
                </li>
              </>
            )}
            {isLoading && <CircularProgress />}
          </div>
        </ul>
      </nav>
    </React.Fragment>
  );
}
