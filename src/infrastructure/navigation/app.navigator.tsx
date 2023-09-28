import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ProfileScreen } from "../../features/account/screens/profile.screen";
import { MapScreen } from "../../features/map/screens/map.screen";

import { RestaurantsNavigator } from "./restaurants.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

type TabParamList = {
  Restaurants: undefined;
  Map: undefined;
  Settings: undefined;
};

const createScreenOptions = ({ route }) => ({
  header: () => null,
  tabBarIcon: ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => {
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

export const AppRootNavigator = () => (
  <>
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Settings" component={ProfileScreen} />
    </Tab.Navigator>
    <StatusBar style="auto" />
  </>
);
