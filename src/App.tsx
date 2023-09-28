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

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("../ReactotronConfig.ts");
}

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
