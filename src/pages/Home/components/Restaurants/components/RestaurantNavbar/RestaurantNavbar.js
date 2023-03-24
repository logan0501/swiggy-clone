import { useContext, useState } from "react";
import classes from "./RestaurantNavbar.module.css";
import { FiChevronDown } from "react-icons/fi";
import { RestaurantContext } from "../../../../../../store/restaurant-context";
import { map } from "lodash";

const navbarItems = ["Relevance", "Delivery Time", "Rating", "Cost"];
export default function RestaurantNavbar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownText, setDropdownText] = useState("Cost");
  const { setRestaurants } = useContext(RestaurantContext);
  const changeHandler = (e) => {
    e.preventDefault();
    props.onNavChange(e.target.name);
    setRestaurants([]);
  };
  const setDropdownTextHandler = (value) => {
    setShowDropdown(false);
    setDropdownText("Cost: " + value);
    props.onNavChange("Cost: " + value);
    setRestaurants([]);
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
          {map(
            navbarItems,
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
              <span
                className={`${
                  classes["filter-item"] + " " + classes["dropdown-filter"]
                } ${navIndex?.includes("Cost") ? classes["focused"] : " "}`}
              >
                {navIndex?.includes("Cost") ? navIndex : dropdownText}
                <span>
                  <FiChevronDown />
                </span>
              </span>
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
