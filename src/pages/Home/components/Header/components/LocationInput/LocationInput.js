import classes from "./LocationInput.module.css";
import { useContext, useState } from "react";
import LocationContext from "../../../../../../store/location-context";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getPosition,
  getUserLocation,
} from "../../../../../../utils/userlocation.helper";
import { getLatitudeAndLongitude } from "../../../../../../actions/fetchLocation";
import {
  ERROR,
  SUCCESS,
} from "../../../../../../constants/userCurrentLocationStatus";
import { RestaurantContext } from "../../../../../../store/restaurant-context";

const LocationInput = () => {
  const locationctx = useContext(LocationContext);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationInput, setLocationInput] = useState(locationctx.locationName);
  const { setIsLoading: isRestaurantLoading, setRestaurants } =
    useContext(RestaurantContext);
  const locationBtnHandler = async () => {
    setLocationLoading(true);
    locationctx.clearLocation();
    setLocationInput("Fetching your location...");
    isRestaurantLoading(true);
    const res = await getPosition();
    if (res.status === SUCCESS) {
      const { data: responseData } = res;
      setRestaurants([]);
      locationctx.setLocation({
        latitude: res.latitude,
        longitude: res.longitude,
        locationName: responseData[0].name + ", " + responseData[0].state,
      });
    } else if (res.status === ERROR) {
      locationctx.setLocationError(res.error.message);
    }
    setLocationLoading(false);
    isRestaurantLoading(false);
    setLocationInput(locationctx.locationName);
  };
  const getLatitudeAndLongitudeHandler = async () => {
    console.log(locationctx, locationInput);
    if (
      locationInput.trim().length === 0 &&
      locationctx.locationName.trim().length === 0
    ) {
      locationctx.setLocationError("Location value cannot be empty.");
      return;
    }
    locationctx.clearLocation();
    setLocationLoading(true);
    setLocationInput("Fetching your location...");
    isRestaurantLoading(true);
    const res = await getLatitudeAndLongitude(
      locationInput,
      locationctx.locationName
    );

    if (res.status === SUCCESS) {
      const { data: responseData } = res;
      setRestaurants([]);
      locationctx.setLocation({
        latitude: responseData[0].lat,
        longitude: responseData[0].lon,
        locationName: responseData[0].name + ", " + responseData[0].state,
      });
    } else if (res.status === ERROR) {
      locationctx.setLocationError(res.error.message);
      setLocationInput("");
    }
    setLocationLoading(false);
    isRestaurantLoading(false);
    setLocationInput("");
  };
  const locationInputChangeHandler = (e) => {
    setLocationInput(e.target.value);
  };
  const locationFocusHandler = () => {
    setLocationInput("");
    locationctx.clearLocation();
  };
  let locationName =
    locationctx.locationName !== "" ? locationctx.locationName : locationInput;
  return (
    <div className={classes.input_container}>
      <div className={classes["find-food-container"]}>
        <div className={classes["find-food-ip-container"]}>
          <input
            type="text"
            className={classes["find-food-ip"]}
            placeholder="Enter your location Delivery..."
            value={locationName}
            onChange={locationInputChangeHandler}
            onFocus={locationFocusHandler}
          />

          <button
            className={classes["find-food-location"]}
            onClick={locationBtnHandler}
          >
            Locate Me
          </button>
        </div>
        <button
          className={classes["find-food-btn"]}
          onClick={getLatitudeAndLongitudeHandler}
        >
          {locationLoading ? (
            <CircularProgress size="2rem" color="inherit" thickness={7} />
          ) : (
            "FIND FOOD"
          )}
        </button>
      </div>
      {locationctx.error && (
        <div className={classes.location_error_text}>{locationctx.error}</div>
      )}
    </div>
  );
};
export default LocationInput;
