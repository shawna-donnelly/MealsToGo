import { FlatList } from "react-native";
import React from "react";
import { RestaurantInfoCard } from "../restaurant-info-card";
import styled from "styled-components/native";
import { Restaurant } from "../../../../services/restaurant/restaurant.context";
import reactotron from "reactotron-react-native";

export const RestaurantsList = ({ data }: { data: Restaurant[] }) => {
  return (
    <RestaurantsListContainer
      data={data}
      renderItem={(item) => {
        reactotron.log?.("item", item);
        return <RestaurantInfoCard restaurant={item.item} />;
      }}
      keyExtractor={(item) => item.name}
    />
  );
};

const RestaurantsListContainer = styled(FlatList<Restaurant>).attrs({
  contentContainerStyle: { padding: 16 },
})``;
