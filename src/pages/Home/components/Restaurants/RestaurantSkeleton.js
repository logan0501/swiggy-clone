import "react-loading-skeleton/dist/skeleton.css";
import classes from "./Restaurants.module.css";
import RestaurantNavbar from "./components/RestaurantNavbar/RestaurantNavbar";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

export default function RestaurantSkeleton(props) {
  const array = new Array(16).fill(0);

  return (
    <section className={classes["restaurants-section"]}>
      <RestaurantNavbar />

      <section className={classes["restaurants-display-section"]}>
        {array.map((e, index) => {
          return <RestaurantCardSkeleton key={index} />;
        })}
      </section>
    </section>
  );
}
