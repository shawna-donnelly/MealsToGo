import React, { useState, useContext, useEffect } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { RestaurantInfoCard } from "../components/restaurant-info-card/restaurant-info-card.component";
import { RestaurantContext } from "../../../services/restaurant/restaurant.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { theme } from "../../../infrastructure/theme";
import { Search } from "../components/search.component";

export const RestaurantsScreen = () => {
  const { restaurants, isLoading, error } = useContext(RestaurantContext);

  return (
    <SafeArea>
      <Search />
      <List>
        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator
              size={"large"}
              color={theme.colors.brand.primary}
            />
          </LoadingContainer>
        ) : (
          <RestaurantList
            data={restaurants}
            renderItem={(item) => {
              return <RestaurantInfoCard restaurant={item} />;
            }}
            keyextractor={(item) => item.name}
          />
        )}
      </List>
    </SafeArea>
  );
};

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
})``;

const List = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
