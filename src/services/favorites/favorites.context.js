/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from "@react-native-async-storage/async-storage";
import reactotron from "reactotron-react-native";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [favorites, setFavorites] = useState([]);

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
    try {
      const value = user.uid
        ? await AsyncStorage.getItem(`@favorites-${user.uid}`)
        : null;

      console.log("value", user.uid, value);

      if (value !== null) {
        setFavorites(JSON.parse(value));
      } else {
        setFavorites([]);
      }
    } catch (e) {
      reactotron.log("errorloading", e);
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

  const addToFavorites = (restaurant) => {
    reactotron.log?.("Add to favorites", restaurant);
    setFavorites([...favorites, restaurant]);
  };

  const removeFromFavorites = (restaurant) => {
    const newFavorites = favorites.filter(
      (r) => r.placeId !== restaurant.placeId
    );
    setFavorites(newFavorites);
  };
  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
