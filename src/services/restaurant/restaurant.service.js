import { mockImages, mocks } from "./mock";
import camelize from "camelize";

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResult = results.map((restaurant) => {
    restaurant.photos = restaurant.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * mockImages.length - 1)];
    });
    return {
      ...restaurant,
      address: restaurant.vicinity.split(",")[0],
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResult);
};

export const restaurantsRequest = (location) => {
  const mock = mocks[location];
  return new Promise((resolve, reject) => {
    if (!mock) {
      reject("not found");
    } else {
      resolve(mock);
    }
  });
};
