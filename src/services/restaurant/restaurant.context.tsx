import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { restaurantsRequest, restaurantsTransform } from "./restaurant.service";
import { LocationContext } from "../location/location.context";
export const RestaurantContext = createContext({
  restaurants: [],
  isLoading: false,
  error: null,
});

export interface Restaurant {
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
  placeId: string;
}

export const RestaurantContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { location, error: locationError } = useContext(LocationContext);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setError(null);
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

  const retrieveRestaurants = (locationVal: string) => {
    setIsLoading(true);
    setRestaurants([]);
    restaurantsRequest(locationVal)
      .then(restaurantsTransform)
      .then((results) => {
        setRestaurants(results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        setRestaurants([]);
        setError("Something went wrong. Please try again later.");
        setIsLoading(false);
      });
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantContext.Provider>
  );
};
