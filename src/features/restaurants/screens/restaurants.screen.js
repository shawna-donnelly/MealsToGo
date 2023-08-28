import React, { useState, useContext } from "react";
import { FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { RestaurantInfoCard } from "../components/restaurant-info-card/restaurant-info-card.component";
import { RestaurantContext } from "../../../services/restaurant/restaurant.context";
import { SafeArea } from "../../../components/utility/safe-area.component";

export const RestaurantsScreen = () => {
  const restaurantCtx = useContext(RestaurantContext);
  console.log(restaurantCtx);
  const [searchVal, setSearchVal] = useState("");

  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar
          mode="bar"
          value={searchVal}
          placeholder="Search"
          onChangeText={setSearchVal}
        />
      </SearchContainer>
      <List>
        <RestaurantList
          data={restaurantCtx.restaurants}
          renderItem={(item) => <RestaurantInfoCard />}
          keyextractor={(item) => item.name}
        />
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

const SearchContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.small};
`;
