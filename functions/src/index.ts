/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import { geocodeRequest } from "./geocode";
import { placesRequest } from "./places";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const geocode = onRequest((request, response) => {
  geocodeRequest(request, response, client);
});

export const placesNearby = onRequest((request, response) => {
  placesRequest(request, response, client);
});
