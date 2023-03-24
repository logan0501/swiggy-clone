import classes from "./DropDownItem.module.css";
import { BsFillStarFill } from "react-icons/bs";
import { useContext } from "react";
import cartContext from "../../../../../store/cart-context";
import { IMAGE_W208_H208_CDN_URL } from "../../../../../constants/imageCdnUrls";

export default function DropDownItem(props) {
  const { food } = props;
  const foodPrice = food?.price ?? food.defaultPrice;
  const { restuarantId: restaurantId } = props;
  const { isVeg, isBestseller, name, description } = food;
  const cartCtx = useContext(cartContext);
  let foodQuantity = 0;
  if (cartCtx?.items?.length > 0) {
    const foodIndex = cartCtx.items.findIndex((item) => item.id === food.id);
    const existingItem = cartCtx.items[foodIndex];
    if (existingItem) {
      foodQuantity = existingItem.quantity;
    }
  }

  const addItemToCartHandler = () => {
    cartCtx.addItem({
      id: food.id,
      isVeg: food.isVeg,
      name: food.name,
      price: foodPrice / 100,
      quantity: 1,
      restaurantId,
    });
  };
  const removeItemFromCartHandler = () => {
    cartCtx.removeItem(food.id);
  };
  return (
    <li className={classes.food_item}>
      <div className={classes.food_details}>
        <div className={classes.veg_and_best_seller_container}>
          {isVeg === 1 ? (
            <div className={classes.veg_icon_border}>
              <div className={classes.veg_circle}></div>
            </div>
          ) : (
            <div className={classes.non_veg_icon_border}>
              <div className={classes.non_veg_triangle}></div>
            </div>
          )}
          {isBestseller && (
            <span className={classes.bestseller_container}>
              <BsFillStarFill size="0.9rem" />
              <h5>Bestseller</h5>
            </span>
          )}
        </div>
        <p className={classes.food_name}>{name}</p>
        <p className={classes.food_cost}>₹ {foodPrice / 100}</p>
        <p className={classes.food_description}>{description}</p>
        <p></p>
      </div>
      {food.imageId?.trim().length > 0 ? (
        <div className={classes.food_img_button}>
          <img
            src={`${IMAGE_W208_H208_CDN_URL}${food.imageId}`}
            alt="food_img"
            height="96"
            width="118"
          />
          {foodQuantity === 0 && (
            <div className={classes.add_button} onClick={addItemToCartHandler}>
              ADD
            </div>
          )}
          {foodQuantity !== 0 && (
            <div className={classes.add_button_quantity}>
              <button
                className={classes.button_sub}
                onClick={removeItemFromCartHandler}
              >
                -
              </button>
              <span>{foodQuantity}</span>
              <button
                className={classes.button_add}
                onClick={addItemToCartHandler}
              >
                +
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={classes.food_img_button}>
          <div className={classes.empty_div}></div>
          {foodQuantity === 0 && (
            <div className={classes.add_button} onClick={addItemToCartHandler}>
              ADD
            </div>
          )}
          {foodQuantity !== 0 && (
            <div className={classes.add_button_quantity}>
              <button
                className={classes.button_sub}
                onClick={removeItemFromCartHandler}
              >
                -
              </button>
              <span>{foodQuantity}</span>
              <button
                className={classes.button_add}
                onClick={addItemToCartHandler}
              >
                +
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
