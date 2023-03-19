import React, { useContext } from "react";
import classes from "./CartDetails.module.css";
import CartContext from "../../../../store/cart-context";
import { useNavigate } from "react-router-dom";

function CartDetails(props) {
  const { restaurant } = props;
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const addToCartHandler = (e) => {
    cartCtx.addItemById(e.target.name);
  };
  const removeFromCartHandler = (e) => {
    cartCtx.removeItem(e?.target.name);
  };
  const paymentBtnHandler = () => {
    alert("Payment processed");
    cartCtx.clearCart();
    navigate("/", { replace: true });
  };
  return (
    <section className={classes.cart_details_container}>
      <header>
        <img
          height="50"
          width="50"
          alt=""
          src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/${restaurant.cloudinaryImageId}`}
        />
        <div className={classes.cart_details_hotel_details}>
          <h4>{restaurant?.name}</h4>
          <p>
            {restaurant?.areaName.toUpperCase() + restaurant?.areaName.slice(1)}
          </p>
          <div className={classes.line}></div>
        </div>
      </header>
      <div>
        <ul className={classes.cart_items}>
          {cartCtx.items.length > 0 ? (
            cartCtx.items.map((item) => (
              <li className={classes.cart_item}>
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
                <p className={classes.amount}>₹{item.price * item.quantity}</p>
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
          <p> ₹{cartCtx.totalAmount}</p>
        </div>
      </div>
    </section>
  );
}

export default CartDetails;
