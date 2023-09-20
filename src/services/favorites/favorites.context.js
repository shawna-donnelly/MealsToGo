/* eslint-disable react-hooks/exhaustive-deps */
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const asyncStorage = useAsyncStorage("favorites");

  const storeFavorites = async () => {
    try {
      asyncStorage.setItem(JSON.stringify(favorites));
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavorites = async () => {
    try {
      const value = await asyncStorage.getItem();
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    } catch (e) {
      console.log("errorloading", e);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

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
