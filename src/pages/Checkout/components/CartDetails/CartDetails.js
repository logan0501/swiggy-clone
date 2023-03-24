import React, { useContext } from "react";
import classes from "./CartDetails.module.css";
import CartContext from "../../../../store/cart-context";
import { IMAGE_W100_H100_CDN_URL } from "../../../../constants/imageCdnUrls";
import capitalize from "lodash/capitalize";
import {map} from "lodash";

function CartDetails(props) {
  const { restaurant } = props;
  const { name, cloudinaryImageId } = restaurant;
  const { items, addItemById, removeItem, totalAmount } =
    useContext(CartContext);
  const addToCartHandler = (e) => {
    addItemById(e.target.name);
  };
  const removeFromCartHandler = (e) => {
    removeItem(e?.target.name);
  };
  return (
    <section className={classes.cart_details_container}>
      <header>
        <img
          height="50"
          width="50"
          alt="restaurant_image"
          src={`${IMAGE_W100_H100_CDN_URL}${cloudinaryImageId}`}
        />
        <div className={classes.cart_details_hotel_details}>
          <h4>{name}</h4>
          <p>{capitalize(restaurant?.areaName)}</p>
          <div className={classes.line}></div>
        </div>
      </header>
      <div>
        <ul className={classes.cart_items}>
          {items.length > 0 ? (
            map(items,(item) => (
              <li className={classes.cart_item} key={item.name}>
                <span>{item.name}</span>
                <div className={classes.quantity_button_container}>
                  <button onClick={removeFromCartHandler} name={item.id}>
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button onClick={addToCartHandler} name={item.id}>
                    +
                  </button>
                </div>
                <p className={classes.amount}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </ul>
      </div>
      <div className={classes.bill_details_container}>
        <hr />
        <div className={classes.pay_amount_container}>
          <h5>TO PAY</h5>
          <p> ₹{totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
}

export default CartDetails;
