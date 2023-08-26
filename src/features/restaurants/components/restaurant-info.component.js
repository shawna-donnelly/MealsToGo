import { Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import { Card } from "react-native-paper";

import star from "../../../../assets/star";

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

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <>
      <RestaurantInfoCard elevation={5}>
        <RestaurantCover key={name} source={{ uri: photos[0] }} />
        <Info>
          <Title>{name}</Title>
          <Rating>
            {ratingArray.map(() => (
              <SvgXml xml={star} width={20} height={20} />
            ))}
          </Rating>
          <Address>{address}</Address>
        </Info>
      </RestaurantInfoCard>
    </>
  );
};

const Rating = styled.View`
  flex-direction: row;
  padding-vertical: ${({ theme }) => theme.spacing.xsmall};
`;

const Title = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.ui.primary};
`;

const Info = styled.View`
  padding: ${({ theme }) => theme.spacing.small};
`;

const Address = styled.Text`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.caption};
`;

const RestaurantCover = styled(Card.Cover)`
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;

const RestaurantInfoCard = styled(Card)`
  flex-shrink: 1;
  padding: ${({ theme }) => theme.spacing.medium};
  margin: ${({ theme }) => theme.spacing.small};
`;
