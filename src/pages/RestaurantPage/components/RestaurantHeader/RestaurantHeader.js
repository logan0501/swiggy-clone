import { Fragment } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./RestaurantHeader.module.css";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BsFillStarFill } from "react-icons/bs";
import TimeIcon from "./TimeIcon";
import RuppeeIcon from "./RupeeIcon";
import { FaLeaf } from "react-icons/fa";
import { IMAGE_W28_H28_CDN_URL } from "../../../../constants/imageCdnUrls";
import capitalize from "lodash/capitalize";
import {map} from "lodash";

export default function RestaurantHeader(props) {
  const { restaurantDetails: restaurant, offers } = props.restaurant;
  const {
    city,
    name,
    cuisines,
    sla,
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
    isPureVeg,
    areaName,
  } = restaurant;
  return (
    <Fragment>
      <header className={classes.restaurant_page_location__header}>
        <div className={classes.restaurant_page_location__search}>
          <span>
            Home / {city} / {areaName} /
            <p className={classes.restaurant_name}> {name}</p>
          </span>
          <AiOutlineSearch className={classes.search_icon} />
        </div>
        <div className={classes.restaurant_details}>
          <div className={classes.restaurant_details__location}>
            <h3>{name}</h3>
            <div>
              <p>{cuisines.join(", ")}</p>
              <p>
                {capitalize(areaName)}
                <span className={classes.restaurant_details__distance}>
                  <span>{sla?.lastMileTravelString}</span>
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
              <h3>{avgRatingString}</h3>
            </div>
            <div className={classes.separater}></div>
            <p className={classes.rated_by}>{totalRatingsString}</p>
          </div>
        </div>
        <span className={classes.restaurant_time_cost_container}>
          <span>
            <TimeIcon />
            <span className={classes.restaurant_time_cost__title}>
              {sla?.deliveryTime ? sla?.deliveryTime + " " + "MINS" : "27 MINS"}
            </span>
          </span>
          <span>
            <RuppeeIcon />
            <span className={classes.restaurant_time_cost__title}>
              {costForTwoMessage}
            </span>
          </span>
        </span>
        <ul className={classes.discounts_container}>
          {map(offers,(offer) => {
            return (
              <li className={classes.discount_item} key={offer.offerLogo}>
                <div>
                  <img
                    src={`${IMAGE_W28_H28_CDN_URL}${offer.offerLogo}`}
                    alt=""
                  />
                  <h3>{offer?.header}</h3>
                </div>
                <h6>
                  {offer?.couponCode} | {offer?.description}
                </h6>
              </li>
            );
          })}
        </ul>
      </header>
      <div>
        {isPureVeg && (
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
