import React from "react";
import { StatusBar } from "expo-status-bar";

import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { useFonts, Oswald_400Regular } from "@expo-google-fonts/oswald";
import { Lato_400Regular } from "@expo-google-fonts/lato";

export default function App() {
  const [fontsLoaded] = useFonts({ Oswald_400Regular, Lato_400Regular });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <>
        <ThemeProvider theme={theme}>
          <RestaurantsScreen />
          <StatusBar style="auto" />
        </ThemeProvider>
      </>
    );
  }
}
