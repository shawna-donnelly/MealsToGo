import React, { useContext, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";

import { RestaurantContext } from "../../../services/restaurant/restaurant.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { LocationContext } from "../../../services/location/location.context";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { theme } from "../../../infrastructure/theme";
import { Search } from "../components/search.component";

import { FavoritesBar } from "../../../components/favorites/favorites-bar.component";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { RestaurantsList } from "../components/restaurants-list/restaurants-list.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { Text } from "../../../components/typography";

export const RestaurantsScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { restaurants, isLoading, error } = useContext(RestaurantContext);
  const { favorites } = useContext(FavoritesContext);
  const { error: locationError } = useContext(LocationContext);

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
          <FadeInView>
            {(!!error || !!locationError) && (
              <Text variant="error">{error || locationError}</Text>
            )}
            <RestaurantsList data={restaurants} />
          </FadeInView>
        )}
      </List>
    </SafeArea>
  );
};

const List = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
