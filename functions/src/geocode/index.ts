import { logger } from "firebase-functions/v2";
import { QueryResults, locations as locationsMock } from "./geocode.mock";
import { Client } from "@googlemaps/google-maps-services-js";

export const geocodeRequest = async (
  request: any,
  response: any,
  client: Client
) => {
  logger.info(`request.url, ${request.url}`, { structuredData: true });
  const urlParams = new URLSearchParams(
    decodeURIComponent(request.url.slice(1))
  );
  logger.info(`urlParams , ${urlParams}`, { structuredData: true });

  const city = urlParams.get("city");
  const mock = urlParams.get("mock");

  if (mock === "true") {
    let locationMock: QueryResults = { results: [] };

    if (city) {
      locationMock = locationsMock[city.toLowerCase()] || { results: [] };
    }
    logger.info(`locationMock , ${locationMock}`, { structuredData: true });

    return response.send(locationMock);
  } else {
    console.log("key", process.env.GOOGLE_API_KEY);
    let res = await client
      .geocode({
        params: {
          address: city ?? undefined,
          key: process.env.GOOGLE_API_KEY || "",
        },
        timeout: 1000, // milliseconds
      })
      .catch((e) => {
        response.status(400);
        return response.send(e.response.data.error_message);
      });
    console.log(res.data);
    return response.json(res.data);
  }
};
