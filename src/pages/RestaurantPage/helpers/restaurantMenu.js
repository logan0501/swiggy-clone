export const parseRestaurantData = (response) => {
  const { data: responseData } = response;
  const isPureVeg =
    responseData[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[0]?.card?.card
      .isPureVeg;
  const restaurantDetails = responseData[0]?.card?.card?.info;
  const offers =
    responseData[1]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
      (offer) => offer?.info
    );

  const menuObj = {
    isPureVeg,
    foodItems: [],
    restaurantDetails,
    offers,
  };
  const restaurantCategories =
    responseData[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  for (let i = 1; i < restaurantCategories.length; i++) {
    const menuItem = {
      category: restaurantCategories[i]?.card?.card?.title,
      categoryItems: [],
    };

    const foodItems = restaurantCategories[i]?.card?.card?.itemCards;
    if (foodItems) {
      for (const item of foodItems) {
        menuItem?.categoryItems?.push({
          foodid: item?.card?.info?.id,
          foodDetails: item?.card?.info,
        });
      }
      menuObj.foodItems.push(menuItem);
    }
  }
  return menuObj;
};
