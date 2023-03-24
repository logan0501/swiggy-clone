import React, { Fragment, useContext, useEffect, useState } from "react";
import RestaurantSearchbar from "./components/RestaurantSearchBar/RestaurantSearchbar";
import classes from "./RestaurantPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import CartContext from "../../store/cart-context";
import ReactDOM from "react-dom";
import { getRestaurantMenu } from "../../actions/fetchRestaurantMenu";
import { ERROR, SUCCESS } from "../../constants/userCurrentLocationStatus";
import locationContext from "../../store/location-context";
import { parseRestaurantData } from "./helpers/restaurantMenu";
import { CartError } from "./components/CartError/CartError";
import ViewCart from "./components/ViewCart/ViewCart";
import RestaurantSkeleton from "../RestaurantPage/components/RestaurantSkeleton/RestaurantSkeleton";
import RestaurantHeader from "./components/RestaurantHeader/RestaurantHeader";
import DropDownContainer from "./components/DropDownContainer/DropDownContainer";

export default function RestaurantPage() {
  const { id } = useParams();
  const [restaurantMenu, setRestaurantMenu] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { items, totalAmount, hasError, clearCart, clearError } =
    useContext(CartContext);
  const locationCtx = useContext(locationContext);
  const navigation = useNavigate();

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

  const viewCartHandler = () => {
    navigation("/check-out", {
      state: {
        restaurant: restaurantMenu,
      },
    });
  };

  const resetAndAdnNewItemHandler = () => {
    clearCart();
  };
  const CloseErrorModalHandler = () => {
    clearError();
  };
  return (
    <Fragment>
      <RestaurantSearchbar restaurant={restaurantMenu} />
      <section className={classes.restaurant_page_container}>
        {!isLoading && <RestaurantHeader restaurant={restaurantMenu} />}
        {!isLoading && <DropDownContainer restaurant={restaurantMenu} />}
        {!isLoading && (
          <ViewCart
            length={items?.length}
            totalAmount={totalAmount}
            onViewCart={viewCartHandler}
          />
        )}
        {isLoading && <RestaurantSkeleton />}
      </section>

      {hasError &&
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
