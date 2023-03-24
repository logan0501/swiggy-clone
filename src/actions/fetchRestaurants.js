import { ERROR, SUCCESS } from "../constants/userCurrentLocationStatus";
import { filter } from "lodash";

const RESTAURANT_NAVBAR_ITEMS_API_PARAMETERS = {
  Relevance: "RELEVANCE",
  "Delivery Time": "DELIVERY_TIME",
  Rating: "RATING",
  "Cost: Low to High": "COST_FOR_TWO",
  "Cost: High to Low": "COST_FOR_TWO_H2L",
};

export const getRestaurantsData = async (latitude, longitude, navIndex) => {
  try {
    const response = await fetch(
      `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&sortBy=${RESTAURANT_NAVBAR_ITEMS_API_PARAMETERS[navIndex]}&page_type=DESKTOP_WEB_LISTING`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const restaurantDataJson = await response.json();
    const restaurantData = filter(
      restaurantDataJson.data.cards,
      (rest) => rest.cardType === "seeAllRestaurants"
    )[0];
    return { status: SUCCESS, data: restaurantData.data.data.cards };
  } catch (error) {
    return { status: ERROR, error: error };
  }
};
