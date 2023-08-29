import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { restaurantsRequest, restaurantsTransform } from "./restaurant.service";
import { LocationContext } from "../location/location.context";
export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
  const { location, error: locationError } = useContext(LocationContext);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    } else {
      setRestaurants([]);
    }
  }, [location]);

  useEffect(() => {
    console.log("locationError changed", locationError);
    if (locationError) {
      setRestaurants([]);
    }
  }, [locationError]);

  const retrieveRestaurants = (locationVal) => {
    setIsLoading(true);
    setRestaurants([]);
    setTimeout(() => {
      restaurantsRequest(locationVal)
        .then(restaurantsTransform)
        .then((results) => {
          setRestaurants(results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log({ err });
          setRestaurants([]);
          setError(err);
          setIsLoading(false);
        });
    }, 2000);
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantContext.Provider>
  );
};
