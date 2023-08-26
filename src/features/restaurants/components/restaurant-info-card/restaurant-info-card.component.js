import React from "react";

import { OpenNow, Star } from "../../../../../assets";
import { Spacer } from "../../../../components/spacer";
import { Text } from "../../../../components/typography";
import {
  SVGIcon,
  Icons,
  Rating,
  Section,
  Info,
  RestaurantTypeImage,
  RestaurantCover,
  RestaurantInfoCardContainer,
} from "../restaurant-info-card/restaurant-info-card.styles";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
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
      <RestaurantInfoCardContainer elevation={5}>
        <RestaurantCover key={name} source={{ uri: photos[0] }} />
        <Info>
          <Text variant="label">{name}</Text>
          <Section>
            <Rating>
              {ratingArray.map((_, index) => (
                <SVGIcon key={`rating_${index}`} xml={Star} />
              ))}
            </Rating>
            <Icons>
              {isOpenNow && (
                <Spacer size="small" position="left">
                  <SVGIcon xml={OpenNow} />
                </Spacer>
              )}
              {isClosedTemporarily && (
                <>
                  <Spacer size="small" position="left">
                    <Text variant="error">Closed Temporarily</Text>
                  </Spacer>
                </>
              )}
              <Spacer size="small" position="left">
                <RestaurantTypeImage source={{ uri: icon }} />
              </Spacer>
            </Icons>
          </Section>
          <Text variant="caption">{address}</Text>
        </Info>
      </RestaurantInfoCardContainer>
    </>
  );
};
