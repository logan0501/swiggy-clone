import { Fragment, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import classes from "./DropDownContainer.module.css";
import DropDownItem from "./DropDownItem/DropDownIItem";

export default function DropDownContainer(props) {
  const {
    restaurant: { foodItems: menuItems },
  } = props;
  const restaurantId = props.restaurant.restaurantDetails.id;
  // const menuIdKeys = Object.keys(menuItems);
  // const menuBasedOnCategory = {};
  // menuBasedOnCategory["Recommended"] = [];
  // for (const key of menuIdKeys) {
  //   if (menuItems[key].recommended === 1) {
  //     menuBasedOnCategory["Recommended"].push(key);
  //   }
  // }
  // if (menuBasedOnCategory["Recommended"].length == 0)
  //   delete menuBasedOnCategory["Recommended"];
  // for (const key of menuIdKeys) {
  //   const category = menuItems[key].category;
  //   if (category in menuBasedOnCategory) {
  //     menuBasedOnCategory[category].push(key);
  //   } else menuBasedOnCategory[category.trim()] = [key];
  // }
  // const menuCategories = Object.keys(menuBasedOnCategory);

  const [showDropdown, setShowDropdown] = useState([]);
  const dropdownHandler = (newval) => {
    setShowDropdown((prev) => {
      if (prev.includes(newval)) {
        const newarray = [...prev];
        newarray.splice(
          prev.findIndex((item) => {
            return item === newval;
          }),
          1
        );

        return newarray;
      } else {
        return [...prev, newval];
      }
    });
  };

  return (
    <Fragment>
      {menuItems.map((menuCategory) => {
        return (
          <Fragment key={menuCategory?.category}>
            <div className={classes.dropdown_container}>
              <header className={classes.dropdown_header}>
                <h3>{`${menuCategory?.category} (${menuCategory?.categoryItems?.length})`}</h3>
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
                {menuCategory.categoryItems.map((menukey) => {
                  return (
                    <DropDownItem
                      key={menukey?.foodid}
                      food={menukey?.foodDetails}
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
