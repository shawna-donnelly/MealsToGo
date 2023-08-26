import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card/restaurant-info-card.component";
import styled from "styled-components/native";

export const RestaurantsScreen = () => {
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
        <RestaurantInfoCard />
      </List>
    </SafeArea>
  );
};

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const List = styled.View`
  flex: 1;
`;

const SearchContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.small};
`;
