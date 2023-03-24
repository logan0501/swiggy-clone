import { getLocationName } from "../actions/fetchLocation";
import { ERROR, SUCCESS } from "../constants/userCurrentLocationStatus";

const getUserLocation = async () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

export const getPosition = async () => {
  try {
    const position = await getUserLocation();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const res = await getLocationName(latitude, longitude);
    return { data: res.data, latitude, longitude, status: SUCCESS };
  } catch (error) {
    return { status: ERROR, error: error };
  }
};
