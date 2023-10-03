/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from "@react-native-async-storage/async-storage";
import reactotron from "reactotron-react-native";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import { Restaurant } from "../restaurant/restaurant.context";

export const FavoritesContext = createContext({
  isLoading: false,
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

export const FavoritesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useContext(AuthenticationContext);
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const storeFavorites = async () => {
    reactotron.log?.("storing", favorites, user);
    try {
      if (user?.uid) {
        reactotron.log?.("Should be storing", user.uid);
        await AsyncStorage.setItem(
          `@favorites-${user.uid}`,
          JSON.stringify(favorites)
        );
      }
    } catch (e) {
      reactotron.log?.("error storing", e);
    }
  };

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const value = user?.uid
        ? await AsyncStorage.getItem(`@favorites-${user.uid}`)
        : null;

      console.log("value", user?.uid, value);

      if (value !== null) {
        setFavorites(JSON.parse(value));
      } else {
        setFavorites([]);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      reactotron.log?.("errorloading", e);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  useEffect(() => {
    reactotron.log?.("favorites changed", favorites);
    if (favorites && user) {
      storeFavorites();
    }
  }, [favorites, user]);

  const addToFavorites = (restaurant: Restaurant) => {
    reactotron.log?.("Add to favorites", restaurant);
    setFavorites([...favorites, restaurant]);
  };

  const removeFromFavorites = (restaurant: Restaurant) => {
    const newFavorites = favorites.filter(
      (r) => r.placeId !== restaurant.placeId
    );
    setFavorites(newFavorites);
  };
  return (
    <FavoritesContext.Provider
      value={{ isLoading, favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
