import classes from "./RestaurantCard.module.css";
import { BsFillStarFill } from "react-icons/bs";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RestaurantCard(props) {
  const { restaurant } = props;

  const [quickView, setQuickView] = useState(false);

  const showQuickView = () => {
    setQuickView(true);
  };
  const hideQuickView = () => {
    setQuickView(false);
  };
  return (
    <Link to={"/restaurant-menu/" + restaurant.id}>
      <div
        className={classes["restaurant-card"]}
        onMouseEnter={showQuickView}
        onMouseLeave={hideQuickView}
      >
        <div className={classes["restaurant-card-img-div"]}>
          {
            <img
              className={classes["restaurant-img"]}
              src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${restaurant.cloudinaryImageId}`}
              alt=""
            />
          }
          {restaurant.promoted && (
            <span>
              <div className={classes["restaurant-card-promoted"]}>
                PROMOTED
              </div>
              <div className={classes["restaurant-card-promoted-trap"]}></div>
            </span>
          )}
        </div>
        <div>
          <h3 className={classes["restaurant-title"]}>{restaurant.name}</h3>
          <p className={classes["restaurant-subtitle"]}>
            {restaurant.cuisines.join(", ")}
          </p>
        </div>
        <div className={classes["restaurant-detail-container"]}>
          <span className={classes["restaurant-rating"]}>
            <BsFillStarFill /> <span>{restaurant.avgRating}</span>
          </span>
          <div className={classes["dot"]}></div>
          <span>{restaurant.slaString}</span>
          <div className={classes["dot"]}></div>
          <span>{restaurant.costForTwoString}</span>
        </div>
        <div className={classes["restaurant-card-line"]}></div>
        <p className={classes["restaurant-coupon"]}>
          <TbDiscountCheckFilled size="20px" />
          {restaurant?.aggregatedDiscountInfo?.header}{" "}
          {restaurant?.aggregatedDiscountInfo?.header !== "FREE DELIVERY"
            ? "| USE TRYNEW"
            : ""}
        </p>
        <div
          className={classes["restaurant-card-footer"]}
          style={{ opacity: quickView ? "100" : "0" }}
        >
          <div className={classes["restaurant-card-line"]}></div>
          <p>QUICK VIEW</p>
        </div>
      </div>
    </Link>
  );
}
