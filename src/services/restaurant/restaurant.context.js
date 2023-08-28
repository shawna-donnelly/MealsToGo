import React, { useState, createContext, useEffect, useMemo } from "react";
import { restaurantsRequest, restaurantsTransform } from "./restaurant.service";
export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    retrieveRestaurants();
  }, []);

  const retrieveRestaurants = () => {
    setIsLoading(true);
    setTimeout(() => {
      restaurantsRequest()
        .then(restaurantsTransform)
        .then((results) => {
          setRestaurants(results);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }, 2000);
  };

  return (
    <RestaurantContext.Provider value={{ restaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};
