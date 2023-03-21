import { WEATHER_API_KEY } from "../utils/constants/APIKeys";
import { ERROR, SUCCESS } from "../utils/constants/userCurrentLocationStatus";

export const getLocationName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}8&lon=${longitude}&limit=1&appid=${WEATHER_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return { status: SUCCESS, data };
  } catch (error) {
    return { status: ERROR, error };
  }
  sessionStorage.setItem("latitude", latitude);
  sessionStorage.setItem("longitude", longitude);
};

export const getLatitudeAndLongitude = async (
  input,
  locationNameFromContext
) => {
  try {
    let locationInput = input ? input : locationNameFromContext;
    if (locationInput.includes(" ")) locationInput.replace(" ", "");
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&limit=1&appid=${WEATHER_API_KEY}`
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
