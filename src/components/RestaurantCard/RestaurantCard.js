import classes from "./RestaurantCard.module.css";
import { BsFillStarFill } from "react-icons/bs";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IMAGE_W508_H320_CDN_URL } from "../../constants/imageCdnUrls";
import { join } from "lodash";

export default function RestaurantCard(props) {
  const { restaurant } = props;
  const {
    id,
    cloudinaryImageId,
    promoted,
    name,
    cuisines,
    avgRating,
    slaString,
    costForTwoString,
    aggregatedDiscountInfo,
  } = restaurant;

  const [quickView, setQuickView] = useState(false);

  const showQuickView = () => {
    setQuickView(true);
  };
  const hideQuickView = () => {
    setQuickView(false);
  };
  return (
    <Link to={"/restaurant-menu/" + id}>
      <div
        className={classes["restaurant-card"]}
        onMouseEnter={showQuickView}
        onMouseLeave={hideQuickView}
      >
        <div className={classes["restaurant-card-img-div"]}>
          {cloudinaryImageId.trim().length !== 0 ? (
            <img
              className={classes["restaurant-img"]}
              src={`${IMAGE_W508_H320_CDN_URL}${cloudinaryImageId}`}
              alt=""
            />
          ) : (
            <div className={classes.restaurantImagePlaceHolder}></div>
          )}
          {promoted && (
            <span>
              <div className={classes["restaurant-card-promoted"]}>
                PROMOTED
              </div>
              <div className={classes["restaurant-card-promoted-trap"]}></div>
            </span>
          )}
        </div>
        <div>
          <h3 className={classes["restaurant-title"]}>{name}</h3>
          <p className={classes["restaurant-subtitle"]}>
            {join(cuisines, ", ")}
          </p>
        </div>
        <div className={classes["restaurant-detail-container"]}>
          <span className={classes["restaurant-rating"]}>
            <BsFillStarFill /> <span>{avgRating}</span>
          </span>
          <div className={classes["dot"]}></div>
          <span>{slaString}</span>
          <div className={classes["dot"]}></div>
          <span>{costForTwoString}</span>
        </div>
        <div className={classes["restaurant-card-line"]}></div>
        <p className={classes["restaurant-coupon"]}>
          <TbDiscountCheckFilled size="20px" />
          {aggregatedDiscountInfo?.header}{" "}
          {aggregatedDiscountInfo?.header !== "FREE DELIVERY"
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
