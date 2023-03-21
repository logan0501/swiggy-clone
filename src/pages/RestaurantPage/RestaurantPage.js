import React, { Fragment, useContext, useEffect, useState } from "react";
import RestaurantSearchbar from "./Components/RestaurantSearchBar/RestaurantSearchbar";
import RestaurantHeader from "./Components/RestaurantHeader/RestaurantHeader";
import classes from "./RestaurantPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import CartContext from "../../store/cart-context";
import ReactDOM from "react-dom";
import { getRestaurantMenu } from "../../actions/fetchRestaurantMenu";
import {
  ERROR,
  SUCCESS,
} from "../../utils/constants/userCurrentLocationStatus";
import locationContext from "../../store/location-context";
import DropDownContainer from "./Components/DropDownContainer/DropDownContainer";
import { parseRestaurantData } from "./helpers/restaurantMenu";
import { CartError } from "./Components/CartError/CartError";
import ViewCart from "./Components/ViewCart/ViewCart";

export default function RestaurantPage() {
  const { id } = useParams();
  const [restaurantMenu, setRestaurantMenu] = useState({});
  const [isLoading, setLoading] = useState(true);
  const cartCtx = useContext(CartContext);
  const locationCtx = useContext(locationContext);

  const getData = async () => {
    try {
      const response = await getRestaurantMenu(
        locationCtx.latitude,
        locationCtx.longitude,
        id
      );
      if (response.status === SUCCESS) {
        const menuObj = parseRestaurantData(response);
        setRestaurantMenu(menuObj);
        setLoading(false);
      } else if (response.status === ERROR) {
        throw new Error(response.error);
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const navigation = useNavigate();
  const viewCartHandler = () => {
    navigation("/check-out", {
      state: {
        restaurant: restaurantMenu,
      },
    });
  };

  const resetAndAdnNewItemHandler = () => {
    cartCtx.clearCart();
  };
  const CloseErrorModalHandler = () => {
    cartCtx.clearError();
  };
  return (
    <Fragment>
      <RestaurantSearchbar restaurant={restaurantMenu} />
      <section className={classes.restaurant_page_container}>
        {!isLoading && <RestaurantHeader restaurant={restaurantMenu} />}
        {!isLoading && <DropDownContainer restaurant={restaurantMenu} />}
        <ViewCart
          length={cartCtx?.items?.length}
          totalAmount={cartCtx.totalAmount}
          onViewCart={viewCartHandler}
        />
      </section>

      {cartCtx.hasError &&
        ReactDOM.createPortal(
          <CartError
            resetAndAdnNewItemHandler={resetAndAdnNewItemHandler}
            CloseErrorModalHandler={CloseErrorModalHandler}
          />,
          document.getElementById("cart_error_modal")
        )}
    </Fragment>
  );
}
