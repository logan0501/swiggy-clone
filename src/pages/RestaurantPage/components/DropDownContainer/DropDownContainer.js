import { Fragment, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import classes from "./DropDownContainer.module.css";
import DropDownItem from "./DropDownItem/DropDownIItem";
import { showDropDownHandler } from "./helpers/dropdownContainer.general";
import {map} from "lodash";

export default function DropDownContainer(props) {
  const {
    restaurant: { foodItems: menuItems },
  } = props;
  const restaurantId = props.restaurant.restaurantDetails.id;
  const [showDropdown, setShowDropdown] = useState([]);
  const dropdownHandler = (newval) => {
    setShowDropdown((prevState) => showDropDownHandler(prevState, newval));
  };

  return (
    <Fragment>
      {menuItems && map(menuItems,(menuCategory) => {
        const { category, categoryItems } = menuCategory;
        return (
          <Fragment key={category}>
            <div className={classes.dropdown_container}>
              <header className={classes.dropdown_header}>
                <h3>{`${category} (${categoryItems?.length})`}</h3>
                <MdExpandMore
                  onClick={dropdownHandler.bind(null, menuCategory)}
                  size="2rem"
                  className={
                    !showDropdown.includes(menuCategory)
                      ? classes.dropdown_down
                      : classes.dropdown_up
                  }
                />
              </header>
              <ul
                className={classes.food_details_container}
                style={{
                  display: showDropdown.includes(menuCategory)
                    ? "block"
                    : "none",
                }}
              >
                {map(categoryItems,(menukey) => {
                  const { foodid, foodDetails } = menukey;
                  return (
                    <DropDownItem
                      key={foodid}
                      food={foodDetails}
                      restuarantId={restaurantId}
                    />
                  );
                })}
              </ul>
            </div>
            <div className={classes.dropdown_footer}></div>
          </Fragment>
        );
      })}
    </Fragment>
  );
}
