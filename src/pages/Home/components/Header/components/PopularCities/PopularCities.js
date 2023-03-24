import React from "react";
import classes from "./PopularCities.module.css";
import { map } from "lodash";

function PopularCities(props) {
  const POPULAR_CITIES = [
    "Ahmedabad",
    "Bangalore",
    "Chennai",
    "Delhi",
    "Gurgaon",
    "Hyderabad",
    "Kolkata",
    "Mumbai",
    "Pune",
    "& more.",
  ];

  return (
    <div className={classes["popular-cities-container"]}>
      <p>POPULAR CITIES IN INDIA</p>
      <ul className={classes["popular-cities-list"]}>
        {map(POPULAR_CITIES, (city) => (
          <a key={city}>{city}</a>
        ))}
      </ul>
    </div>
  );
}

export default PopularCities;
