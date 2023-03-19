import React from "react";
import classes from "./PopularCities.module.css";

function PopularCities(props) {
  return (
    <div className={classes["popular-cities-container"]}>
      <p>POPULAR CITIES IN INDIA</p>
      <ul className={classes["popular-cities-list"]}>
        <a>Ahmedabad</a>
        <a>Bangalore</a>
        <a>Chennai</a>
        <a>Delhi</a>
        <a>Gurgaon</a>
        <a>Hyderabad</a>
        <a>Kolkata</a>
        <a>Mumbai</a>
        <a>Pune</a>
        <a>& more.</a>
      </ul>
    </div>
  );
}

export default PopularCities;
