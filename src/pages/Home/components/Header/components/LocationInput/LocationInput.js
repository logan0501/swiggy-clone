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
} from "../../../../../../utils/constants/userCurrentLocationStatus";

const LocationInput = () => {
  const locationctx = useContext(LocationContext);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationInput, setLocationInput] = useState(locationctx.locationName);

  const locationBtnHandler = async () => {
    setLocationLoading(true);
    setLocationInput("Fetching your location...");
    locationctx.setIsLoading(true);
    const res = await getPosition();
    if (res.status === SUCCESS) {
      const { data: responseData } = res;
      locationctx.setLocation({
        latitude: res.latitude,
        longitude: res.longitude,
        locationName: responseData[0].name + ", " + responseData[0].state,
      });
    } else if (res.status === ERROR) {
      locationctx.setLocationError(res.error.message);
    }
    setLocationLoading(false);
    locationctx.setIsLoading(false);
    setLocationInput(locationctx.locationName);
  };

  const getLatitudeAndLongitudeHandler = async () => {
    if (
      locationInput.trim().length === 0 &&
      locationctx.locationName.trim().length === 0
    ) {
      locationctx.setLocationError("Location value cannot be empty.");
      return;
    }
    setLocationLoading(true);
    setLocationInput("Fetching your location...");
    locationctx.setIsLoading(true);
    const res = await getLatitudeAndLongitude(
      locationInput,
      locationctx.locationName
    );

    if (res.status === SUCCESS) {
      const { data: responseData } = res;
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
    locationctx.setIsLoading(false);
    setLocationInput("");
  };
  const locationInputChangeHandler = (e) => {
    setLocationInput(e.target.value);
  };
  const locationFocusHandler = () => {
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
