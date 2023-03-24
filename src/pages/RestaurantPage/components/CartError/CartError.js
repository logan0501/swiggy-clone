import classes from "./CartError.module.css";

export const CartError = (props) => {
  const { CloseErrorModalHandler, resetAndAdnNewItemHandler } = props;
  return (
    <div className={classes.restaurant_error_modal}>
      <h3>Items already in cart</h3>
      <p>
        Your cart contains items from other restaurant. Would you like to reset
        your cart for adding items from this restaurant?
      </p>
      <div className={classes.error_modal_button_container}>
        <button
          className={classes.error_modal_button + " " + classes.light_button}
          onClick={CloseErrorModalHandler}
        >
          NO
        </button>
        <button
          className={classes.error_modal_button + " " + classes.dark_button}
          onClick={resetAndAdnNewItemHandler}
        >
          YES, START AFRESH
        </button>
      </div>
    </div>
  );
};
