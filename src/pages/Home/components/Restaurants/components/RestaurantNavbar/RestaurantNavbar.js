import { useState } from "react";
import classes from "./RestaurantNavbar.module.css";
import { FiChevronDown } from "react-icons/fi";

const navbarItems = ["Relevance", "Delivery Time", "Rating", "Cost"];
export default function RestaurantNavbar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownText, setDropdownText] = useState("Cost");
  const changeHandler = (e) => {
    e.preventDefault();
    props.onNavChange(e.target.name);
  };
  const setDropdownTextHandler = (value) => {
    setShowDropdown(false);
    setDropdownText("Cost: " + value);
    props.onNavChange("Cost: " + value);
  };
  const showCostDropdownHandler = () => {
    setShowDropdown(true);
  };

  function hideCostDropdownHandler() {
    setShowDropdown(false);
  }

  const navIndex = props.navIndex;
  return (
    <header className={classes["restaurant-header"]}>
      <h2 className={classes["restaurants-title"]}>700 restaurants</h2>
      <nav className={classes["restaurants-filter-nav"]}>
        <ul className={classes["restaurants-filter-nav-ul"]}>
          {navbarItems.map(
            (navbarItem, index) =>
              index < 3 && (
                <li key={navbarItem}>
                  <a
                    href="/"
                    className={`${classes["filter-item"]} ${
                      navIndex === navbarItem ? classes["focused"] : " "
                    }`}
                    onClick={changeHandler}
                    name={navbarItem}
                  >
                    {navbarItem}
                  </a>
                </li>
              )
          )}
          {
            <li
              className={classes["dropdown-filter"]}
              onMouseEnter={showCostDropdownHandler}
              onMouseLeave={hideCostDropdownHandler}
            >
              <a
                href="/"
                className={`${
                  classes["filter-item"] + " " + classes["dropdown-filter"]
                } ${navIndex?.includes("Cost") ? classes["focused"] : " "}`}
              >
                {navIndex?.includes("Cost") ? navIndex : dropdownText}
                <span>
                  <FiChevronDown />
                </span>
              </a>
              {showDropdown && (
                <ul className={classes.cost_dropdown_container}>
                  <li
                    className={classes.cost_dropdown_item}
                    onClick={setDropdownTextHandler.bind(null, "Low to High")}
                  >
                    Low to High
                  </li>
                  <li
                    className={classes.cost_dropdown_item}
                    onClick={setDropdownTextHandler.bind(null, "High to Low")}
                  >
                    High to Low
                  </li>
                </ul>
              )}
            </li>
          }
        </ul>
      </nav>
    </header>
  );
}
