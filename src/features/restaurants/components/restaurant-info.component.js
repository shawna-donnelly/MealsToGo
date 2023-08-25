import { StyleSheet } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { Card } from "react-native-paper";

export const RestaurantInfo = ({ restaurant = {} }) => {
  const {
    name = "Some Restaurant",
    icon,
    photos = [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = false,
  } = restaurant;

  return (
    <>
      <Card style={styles.card}>
        <Card.Cover
          style={styles.cover}
          key={name}
          source={{ uri: photos[0] }}
        />
        <Title>{name}</Title>
      </Card>
    </>
  );
};

const Title = styled.Text`
  padding: 16px;
  color: blue;
`;

const styles = StyleSheet.create({
  titleStyle: {
    justifyContent: "flex-start",
  },
  titleContainer: {
    paddingLeft: 0,
  },
  card: { flexShrink: 1, padding: 8, margin: 8 },
  cover: { backgroundColor: "white" },
});
