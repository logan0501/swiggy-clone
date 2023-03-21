import React from "react";
import NavBar from "./components/NavBar/NavBar";
import classes from "./Header.module.css";
import LocationInput from "./components/LocationInput/LocationInput";
import PopularCities from "./components/PopularCities/PopularCities";

export default function Header(props) {
  return (
    <header className={classes.header}>
      <section className={`${classes["nav-section"]} ${props.className}`}>
        <NavBar onMenuChange={props.onMenuChange} />
        <div className={classes["home-title"]}>
          <h1>Game Night?</h1>
          <p className={classes["grey-para"]}>
            Order food from favourite restaurants near you.
          </p>
        </div>
        <LocationInput />
        <PopularCities />
      </section>
      <aside className={classes["home-img"]}></aside>
    </header>
  );
}
