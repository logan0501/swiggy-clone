import React, { useState } from "react";
import { RestaurantContext } from "./restaurant-context";

function RestaurantsProvider(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setRestaurantsHandler = (restaurants) => {
    setRestaurants(restaurants);
  };
  const setIsLoadingHandler = (value) => {
    setIsLoading(value);
  };
  const restaurantContext = {
    restaurants,
    setRestaurants: setRestaurantsHandler,
    isLoading,
    setIsLoading: setIsLoadingHandler,
  };
  console.log(restaurants);
  return (
    <RestaurantContext.Provider value={restaurantContext}>
      {props.children}
    </RestaurantContext.Provider>
  );
}

export default RestaurantsProvider;
