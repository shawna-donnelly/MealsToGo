/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [favorites, setFavorites] = useState([]);

  const storeFavorites = async () => {
    try {
      if (user.uid) {
        AsyncStorage.setItem(
          `@favorites-${user.uid}`,
          JSON.stringify(favorites)
        );
      }
    } catch (e) {
      console.log("error storing", e);
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
      console.log("errorloading", e);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  useEffect(() => {
    if (favorites) {
      storeFavorites();
    }
  }, [favorites]);

  const addToFavorites = (restaurant) => {
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
