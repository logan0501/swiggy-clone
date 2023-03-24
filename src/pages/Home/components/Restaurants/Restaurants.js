import RestaurantNavbar from "./components/RestaurantNavbar/RestaurantNavbar";
import RestaurantCard from "../../../../components/RestaurantCard/RestaurantCard";
import classes from "./Restaurants.module.css";
import { Fragment, useContext, useEffect } from "react";
import RestaurantSkeleton from "./RestaurantSkeleton";
import LocationContext from "../../../../store/location-context";
import { getRestaurantsData } from "../../../../actions/fetchRestaurants";
import {
  ERROR,
  SUCCESS,
} from "../../../../constants/userCurrentLocationStatus";
import { RestaurantContext } from "../../../../store/restaurant-context";
import { map } from "lodash";

let latitude;
let longitude;
export default function Restaurants() {
  // const [navIndex, setNavIndex] = useState("Relevance");
  const locationctx = useContext(LocationContext);
  const restaurantContext = useContext(RestaurantContext);
  const restaurants = restaurantContext.restaurants;
  const {
    restaurantFilterType: navIndex,
    setRestaurantFilterType: setNavIndex,
  } = restaurantContext;
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

  latitude = locationctx.latitude;
  longitude = locationctx.longitude;

  useEffect(() => {
    if (latitude && longitude && restaurants.length === 0) {
      getData(latitude, longitude);
    }
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
            {map(restaurants, (restaurant) => (
              <RestaurantCard
                key={restaurant?.data?.id}
                restaurant={restaurant?.data}
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
