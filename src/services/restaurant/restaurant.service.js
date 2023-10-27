import camelize from "camelize";
import { hostPlaces, isMock } from "../../utils/env";

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResult = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity.split(",")[0],
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResult);
};

export const restaurantsRequest = async (location) => {
  let url = `${hostPlaces}/?location=${location}&mock=${isMock}`;

  let response = await fetch(url);
  response = await response.json();

  return response;
};
