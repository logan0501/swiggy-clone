import React, { useState } from "react";
import LocationContext from "./location-context";

const initialLocationState = {
  latitude: 0,
  longitude: 0,
  locationName: "",
  isLoading: false,
};
// https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9684517&lng=77.70943749999999&sortBy=DELIVERY_TIME&page_type=DESKTOP_WEB_LISTING
const LocationProvider = (props) => {
  const [location, setLocation] = useState(initialLocationState);
  const [locationError, setLocationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const changeLocation = (newlocation) => {
    setLocation({
      latitude: newlocation.latitude,
      longitude: newlocation.longitude,
      locationName: newlocation.locationName,
    });
  };
  const clearLocation = () => {
    setLocation(initialLocationState);
  };

  const setError = (message) => {
    setLocationError(message);
    setTimeout(() => {
      setLocationError("");
    }, 2000);
  };
  const locationContext = {
    latitude: location.latitude,
    longitude: location.longitude,
    locationName: location.locationName,
    setLocation: changeLocation,
    clearLocation: clearLocation,
    setLocationError: setError,
    error: locationError,
    isLoading,
    setIsLoading: setIsLoading,
  };
  console.log(location.latitude);
  return (
    <LocationContext.Provider value={locationContext}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
