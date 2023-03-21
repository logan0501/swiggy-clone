import RestaurantNavbar from "./components/RestaurantNavbar/RestaurantNavbar";
import RestaurantCard from "../../../../components/RestaurantCard/RestaurantCard";
import classes from "./Restaurants.module.css";
import { Fragment, useContext, useEffect, useState } from "react";
import RestaurantSkeleton from "./RestaurantSkeleton";
import LocationContext from "../../../../store/location-context";
import { getRestaurantsData } from "../../../../actions/fetchRestaurants";
import {
  ERROR,
  SUCCESS,
} from "../../../../utils/constants/userCurrentLocationStatus";
import { RestaurantContext } from "../../../../store/restaurant-context";

export default function Restaurants() {
  const [navIndex, setNavIndex] = useState("Relevance");
  const locationctx = useContext(LocationContext);
  const restaurantContext = useContext(RestaurantContext);
  const restaurants = restaurantContext.restaurants;
  const getData = async (latitude, longitude) => {
    restaurantContext.setIsLoading(true);
    const data = await getRestaurantsData(latitude, longitude, navIndex);
    if (data.status === SUCCESS) {
      restaurantContext.setRestaurants(data.data);
    }
    if (data.status === ERROR) {
      alert(data.error.message);
    }
    restaurantContext.setIsLoading(false);
  };

  let latitude = locationctx.latitude;
  let longitude = locationctx.longitude;
  useEffect(() => {
    if (latitude && longitude) getData(latitude, longitude);
  }, [latitude, longitude, navIndex]);
  const navIndexHandler = (index) => {
    setNavIndex(index);
    restaurantContext.setIsLoading(true);
  };
  return (
    <Fragment>
      {!restaurantContext.isLoading ? (
        <section className={classes["restaurants-section"]}>
          <RestaurantNavbar onNavChange={navIndexHandler} navIndex={navIndex} />
          <section className={classes["restaurants-display-section"]}>
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.data.id}
                restaurant={restaurant.data}
              />
            ))}
          </section>
        </section>
      ) : (
        <RestaurantSkeleton />
      )}
    </Fragment>
  );
}
