import React from "react";

export const RestaurantContext = React.createContext({
  restaurants: [],
  isLoading: false,
  setRestaurants: () => {},
  setIsLoading: () => {},
});
