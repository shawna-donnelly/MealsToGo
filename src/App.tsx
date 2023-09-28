import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./infrastructure/theme";
import { useFonts, Oswald_400Regular } from "@expo-google-fonts/oswald";
import { Lato_400Regular } from "@expo-google-fonts/lato";

import { RestaurantContextProvider } from "./services/restaurant/restaurant.context";
import { LocationContextProvider } from "./services/location/location.context";
import { Navigation } from "./infrastructure/navigation";
import { FavoritesContextProvider } from "./services/favorites/favorites.context";
import { AuthenticationContextProvider } from "./services/authentication/authentication.context";
import { onAuthStateChanged } from "firebase/auth";

export const APPPPP = () => {
  const [fontsLoaded] = useFonts({ Oswald_400Regular, Lato_400Regular });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <>
        <ThemeProvider theme={theme}>
          <AuthenticationContextProvider>
            <FavoritesContextProvider>
              <LocationContextProvider>
                <RestaurantContextProvider>
                  <Navigation />
                </RestaurantContextProvider>
              </LocationContextProvider>
            </FavoritesContextProvider>
          </AuthenticationContextProvider>
        </ThemeProvider>
      </>
    );
  }
};
