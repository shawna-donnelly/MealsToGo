import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card";

export const RestaurantDetail = ({ navigation }) => {
  const route = useRoute();
  const { restaurant } = route.params;

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
    </SafeArea>
  );
};
