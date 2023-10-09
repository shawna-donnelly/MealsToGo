import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { SettingsScreen } from "../../features/account/screens/settings.screen";
import { FavoritesScreen } from "../../features/account/screens/favorites.screen";
import { CameraScreen } from "../../features/account/screens/camera.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerMode: "screen",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ headerTitle: "Favorites" }}
      />
      <SettingsStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerTitle: "Camera" }}
      />
    </SettingsStack.Navigator>
  );
};
