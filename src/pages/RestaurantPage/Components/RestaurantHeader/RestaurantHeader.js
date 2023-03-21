import { Fragment } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./RestaurantHeader.module.css";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BsFillStarFill } from "react-icons/bs";
import TimeIcon from "./TimeIcon";
import RuppeeIcon from "./RupeeIcon";
import { FaLeaf } from "react-icons/fa";

export default function RestaurantHeader(props) {
  const { restaurantDetails: restaurant, offers } = props.restaurant;

  return (
    <Fragment>
      <header className={classes.restaurant_page_location__header}>
        <div className={classes.restaurant_page_location__search}>
          <span>
            Home / {restaurant?.city} / {restaurant?.areaName} /
            <p className={classes.restaurant_name}> {restaurant?.name}</p>
          </span>
          <AiOutlineSearch className={classes.search_icon} />
        </div>
        <div className={classes.restaurant_details}>
          <div className={classes.restaurant_details__location}>
            <h3>{restaurant?.name}</h3>
            <div>
              <p>{restaurant?.cuisines.join(" ,") + " "}</p>
              <p>
                {restaurant?.areaName[0].toUpperCase() +
                  restaurant?.areaName.slice(1) +
                  ",  "}
                <span className={classes.restaurant_details__distance}>
                  <span>{` ${restaurant?.sla?.lastMileTravelString}`}</span>
                  <RiArrowDropDownFill
                    className={classes.restaurant_details__dropdown}
                  />
                </span>
              </p>
            </div>
          </div>
          <div className={classes.restaurant_details__rating_container}>
            <div className={classes.restaurant_details_rating}>
              <BsFillStarFill />
              <h3>{restaurant?.avgRatingString}</h3>
            </div>
            <div className={classes.separater}></div>
            <p className={classes.rated_by}>{restaurant?.totalRatingsString}</p>
          </div>
        </div>
        <span className={classes.restaurant_time_cost_container}>
          <span>
            <TimeIcon />
            <span className={classes.restaurant_time_cost__title}>
              {restaurant?.sla?.deliveryTime + " " + "MINS"}
            </span>
          </span>
          <span>
            <RuppeeIcon />
            <span className={classes.restaurant_time_cost__title}>
              {restaurant?.costForTwoMessage}
            </span>
          </span>
        </span>
        <ul className={classes.discounts_container}>
          {offers.map((discount) => {
            return (
              <li className={classes.discount_item}>
                <div>
                  <img
                    src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/${discount.offerLogo}`}
                    alt=""
                  />
                  <h3>{discount.header}</h3>
                </div>
                <h6>
                  {discount.couponCode} | {discount.description}
                </h6>
              </li>
            );
          })}
        </ul>
      </header>
      <div>
        {restaurant.isPureVeg && (
          <span className={classes.pure_veg_container}>
            <FaLeaf color="#008001" />
            <p className={classes.pure_veg}>PURE VEG</p>
          </span>
        )}
      </div>
      <div className={classes.header_separater}></div>
    </Fragment>
  );
}
