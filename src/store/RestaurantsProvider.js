import React, { useState } from "react";
import { RestaurantContext } from "./restaurant-context";

function RestaurantsProvider(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantFilterType, setRestaurantFilterType] = useState("Relevance");

  const setRestaurantsHandler = (restaurants) => {
    setRestaurants(restaurants);
  };
  const setIsLoadingHandler = (value) => {
    setIsLoading(value);
  };
  const setRestaurantFilterTypeHandler = (value) => {
    setRestaurantFilterType(value);
  };
  const restaurantContext = {
    restaurants,
    setRestaurants: setRestaurantsHandler,
    isLoading,
    restaurantFilterType,
    setIsLoading: setIsLoadingHandler,
    setRestaurantFilterType: setRestaurantFilterTypeHandler,
  };

  return (
    <RestaurantContext.Provider value={restaurantContext}>
      {props.children}
    </RestaurantContext.Provider>
  );
}

export default RestaurantsProvider;
