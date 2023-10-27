import camelize from "camelize";
import { hostGeocode, isMock } from "../../utils/env";

export const locationRequest = async (searchTerm) => {
  console.log("Inside Location Request", { searchTerm });
  let response = await fetch(
    `${hostGeocode}?city=${searchTerm}&mock=${isMock}`
  );
  response = await response.json();

  return response;
};

export const locationTransform = (result) => {
  if (result.results.length === 0) {
    return [];
  }
  console.log("Inside Location Transform", result);
  const formattedResponse = camelize(result);
  console.log({ formattedResponse });
  const { geometry = {} } = formattedResponse.results[0];
  console.log({ geometry });

  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
