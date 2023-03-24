import "react-loading-skeleton/dist/skeleton.css";
import classes from "./Restaurants.module.css";
import RestaurantNavbar from "./components/RestaurantNavbar/RestaurantNavbar";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";
import { map } from "lodash";

export default function RestaurantSkeleton(props) {
  const array = new Array(15).fill(0);

  return (
    <section className={classes["restaurants-section"]}>
      <RestaurantNavbar />

      <section className={classes["restaurants-display-section"]}>
        {map(array, (e, index) => {
          return <RestaurantCardSkeleton key={index} />;
        })}
      </section>
    </section>
  );
}
