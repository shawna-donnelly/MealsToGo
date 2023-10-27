import { logger } from "firebase-functions/v2";
import { addMockImage, mocks } from "./mock";
import { Client } from "@googlemaps/google-maps-services-js";

const addGoogleImage = (restaurant: any) => {
  const ref = restaurant.photos[0].photo_reference;
  if (!ref) {
    restaurant.photos = ["https://via.placeholder.com/400"];
  }
  restaurant.photos = restaurant.photos.map((photo: any) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_API_KEY}`;
  });
  return restaurant;
};

export const placesRequest = async (
  request: any,
  response: any,
  client: Client
) => {
  const urlParams = new URLSearchParams(
    decodeURIComponent(request.url.slice(1))
  );
  logger.info(`urlParams , ${urlParams}`, { structuredData: true });

  const location = urlParams.get("location");
  const mock = urlParams.get("mock");

  logger.info(`urlParams , ${location}`, { structuredData: true });

  if (mock === "true") {
    if (location === null) {
      response.send("No location provided");
    } else if (mocks[location]) {
      const data = mocks[location];
      data.results.map(addMockImage);
      response.json(data);
    } else {
      response.send("No mock data for this location");
    }
  } else {
    if (location && process.env.GOOGLE_API_KEY) {
      let res = await client
        .placesNearby({
          params: {
            location: location,
            radius: 1500, // in meters
            type: "restaurant",
            key: process.env.GOOGLE_API_KEY,
          },
          timeout: 1000,
        })
        .catch((e) => {
          response.status(400);
          return response.send(e.response.data.error_message);
        });
      res.data.results = res.data.results.map(addGoogleImage);
      return response.json(res.data);
    }
  }
};
