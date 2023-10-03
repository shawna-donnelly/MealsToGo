import React, { useContext } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ActivityIndicator } from "react-native-paper";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import styled from "styled-components/native";
import { theme } from "../../../infrastructure/theme";
import reactotron from "reactotron-react-native";
import { Text } from "../../../components/typography";
import { RestaurantsList } from "../../../features/restaurants/components/restaurants-list/restaurants-list.component";

export const FavoritesScreen = () => {
  const { isLoading, favorites } = useContext(FavoritesContext);

  reactotron.log?.("favorites", favorites);

  return (
    <FavoritesArea>
      <List>
        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator
              size={"large"}
              color={theme.colors.brand.primary}
            />
          </LoadingContainer>
        ) : favorites.length > 0 ? (
          <RestaurantsList data={favorites} />
        ) : (
          <AlignCenter>
            <Text variant="label">No favorites yet</Text>
          </AlignCenter>
        )}
      </List>
    </FavoritesArea>
  );
};

const List = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const FavoritesArea = styled(SafeArea)`
  justify-content: center;
`;

const AlignCenter = styled(SafeArea)`
  margin-top: ${(props) => props.theme.spacing.medium};
  align-items: center;
`;
