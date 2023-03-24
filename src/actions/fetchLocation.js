import { WEATHER_API_KEY } from "../constants/APIKeys";
import { ERROR, SUCCESS } from "../constants/userCurrentLocationStatus";
import { replace } from "lodash";

export const getLocationName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}8&lon=${longitude}&limit=1&appid=${WEATHER_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return { status: SUCCESS, data };
  } catch (error) {
    return { status: ERROR, error };
  }
};

export const getLatitudeAndLongitude = async (
  input,
  locationNameFromContext
) => {
  console.log(input, locationNameFromContext);
  try {
    let locationInput = locationNameFromContext
      ? locationNameFromContext
      : input;
    replace(locationInput, " ", "");
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&limit=1&appid=${WEATHER_API_KEY}`
    );
    if (!response.ok) throw new Error(response.statusText);
    const longitudeAndLatitude = await response.json();
    if (longitudeAndLatitude.length === 0)
      throw new Error("Given location not found!");
    const { lat: latitude, lon: longitude } = longitudeAndLatitude[0];
    const data = await getLocationName(latitude, longitude);
    return data;
  } catch (error) {
    console.log(error);
    return { status: ERROR, error };
  }
};
