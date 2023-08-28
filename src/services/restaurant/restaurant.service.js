import { mocks } from "./mock";
import camelize from "camelize";

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResult = results.map((restaurant) => {
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResult);
};

export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  const mock = mocks[location];
  return new Promise((resolve, reject) => {
    if (!mock) {
      reject("not found");
    } else {
      resolve(mock);
    }
  });
};
