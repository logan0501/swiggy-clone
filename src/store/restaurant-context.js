import React from "react";

export const RestaurantContext = React.createContext({
  restaurants: [],
  restaurantFilterType: "Relevance",
  setRestaurantFilterType: () => {},
  isLoading: false,
  setRestaurants: () => {},
  setIsLoading: () => {},
});
