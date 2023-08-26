import { Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import { Card } from "react-native-paper";

import star from "../../../../assets/star";
import openNow from "../../../../assets/open-now";
import { Spacer } from "../../../components/spacer.component";
export const RestaurantInfo = ({ restaurant = {} }) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <>
      <RestaurantInfoCard elevation={5}>
        <RestaurantCover key={name} source={{ uri: photos[0] }} />
        <Info>
          <Title>{name}</Title>
          <Section>
            <Rating>
              {ratingArray.map((_, index) => (
                <SVGIcon key={`rating_${index}`} xml={star} />
              ))}
            </Rating>
            <Icons>
              {isOpenNow && (
                <Spacer size="small" position="left">
                  <SVGIcon xml={openNow} />
                </Spacer>
              )}
              {isClosedTemporarily && (
                <>
                  <Spacer size="small" position="left">
                    <ClosedTemporarily>Closed Temporarily</ClosedTemporarily>
                  </Spacer>
                </>
              )}
              <Spacer size="small" position="left">
                <RestaurantTypeImage source={{ uri: icon }} />
              </Spacer>
            </Icons>
          </Section>
          <Address>{address}</Address>
        </Info>
      </RestaurantInfoCard>
    </>
  );
};

const SVGIcon = styled(SvgXml)`
  width: 20px;
  height: 20px;
`;

const Icons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const RestaurantTypeImage = styled.Image`
  width: 15px;
  height: 15px;
`;

const Rating = styled.View`
  flex-direction: row;
  padding-vertical: ${({ theme }) => theme.spacing.xsmall};
`;
const Section = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ClosedTemporarily = styled(Text)`
  color: ${({ theme }) => theme.colors.ui.error};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

const Title = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.ui.primary};
`;

const Info = styled.View`
  padding-vertical: ${({ theme }) => theme.spacing.small};
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
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;
