import { ERROR, SUCCESS } from "../utils/constants/userCurrentLocationStatus";

export const getRestaurantMenu = async (latitude, longitude, restaurantId) => {
  try {
    const res = await fetch(
      `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${restaurantId}&submitAction=ENTER`
    );
    if (!res.ok) throw new Error();
    const menuJson = await res.json();
    const restaurantMenu = menuJson.data.cards;
    // menuJson.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
    return { status: SUCCESS, data: restaurantMenu };
  } catch (err) {
    return { status: ERROR, error: err };
  }
};
