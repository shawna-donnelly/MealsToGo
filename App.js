import React from "react";
import { StatusBar } from "expo-status-bar";

import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { useFonts, Oswald_400Regular } from "@expo-google-fonts/oswald";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsScreen } from "./src/features/account/screens/account.screen";
import { MapScreen } from "./src/features/map/screens/map.screen";
import { SafeArea } from "./src/components/utility/safe-area.component";
import { RestaurantContextProvider } from "./src/services/restaurant/restaurant.context";
import { LocationContextProvider } from "./src/services/location/location.context";

export default function App() {
  const [fontsLoaded] = useFonts({ Oswald_400Regular, Lato_400Regular });

  const Tab = createBottomTabNavigator();

  const TAB_ICON = {
    Restaurants: "restaurant",
    Map: "md-map",
    Settings: "md-settings",
  };

  const createScreenOptions = ({ route }) => ({
    header: () => null,
    /* eslint-disable react/no-unstable-nested-components */
    tabBarIcon: ({ focused, color, size }) => {
      // You can return any component that you like here!
      let iconName = TAB_ICON[route.name];
      if (!focused) {
        iconName += "-outline";
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <>
        <LocationContextProvider>
          <RestaurantContextProvider>
            <NavigationContainer>
              <ThemeProvider theme={theme}>
                <SafeArea>
                  <Tab.Navigator screenOptions={createScreenOptions}>
                    <Tab.Screen
                      name="Restaurants"
                      component={RestaurantsScreen}
                    />
                    <Tab.Screen name="Map" component={MapScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                  </Tab.Navigator>
                  <StatusBar style="auto" />
                </SafeArea>
              </ThemeProvider>
            </NavigationContainer>
          </RestaurantContextProvider>
        </LocationContextProvider>
      </>
    );
  }
}
