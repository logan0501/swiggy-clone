import React from "react";

const LocationContext = React.createContext({
  locationName: "",
  latitude: 0,
  longitude: 0,
  isLoading: false,
  error: "",
  setLocation: () => {},
  clearLocation: () => {},
  setLocationError: () => {},
  setIsLoading: () => {},
});
export default LocationContext;
