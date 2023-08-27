import React, { useState } from "react";
import { SafeAreaView, StatusBar, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card/restaurant-info-card.component";
import styled from "styled-components/native";

export const RestaurantsScreen = () => {
  const [searchVal, setSearchVal] = useState("");
  const [restaurants, setRestaurants] = useState([
    {
      name: "Some Restaurant",
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      photos: [
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      ],
      address: "100 some random street",
      isOpenNow: true,
      rating: 4,
      isClosedTemporarily: true,
    },
    { name: 2 },
    { name: 3 },
    { name: 4 },
    { name: 5 },
    { name: 6 },
    { name: 7 },
    { name: 8 },
    { name: 9 },
  ]);

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
          data={restaurants}
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
