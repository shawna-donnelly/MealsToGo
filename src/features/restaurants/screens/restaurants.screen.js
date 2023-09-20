import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";

import { RestaurantInfoCard } from "../components/restaurant-info-card/restaurant-info-card.component";
import { RestaurantContext } from "../../../services/restaurant/restaurant.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { theme } from "../../../infrastructure/theme";
import { Search } from "../components/search.component";

import { FavoritesBar } from "../../../components/favorites/favorites-bar.component";
import { RestaurantDetail } from "./restaurant-detail.screen";

export const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantContext);
  const { favorites } = useContext(FavoritesContext);

  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      <Search
        favoritesToggled={isToggled}
        onFavoritesToggle={() => {
          setIsToggled(!isToggled);
        }}
      />
      {isToggled && (
        <FavoritesBar favorites={favorites} onNavigate={navigation.navigate} />
      )}
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
            renderItem={(restaurant) => {
              return <RestaurantInfoCard restaurant={restaurant.item} />;
            }}
            keyExtractor={(item) => item.name}
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
