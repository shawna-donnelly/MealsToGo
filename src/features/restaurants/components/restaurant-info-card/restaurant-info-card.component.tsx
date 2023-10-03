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
} from "./restaurant-info-card.styles";
import { Favorite } from "../../../../components/favorites/favorite.component";
import { useNavigation } from "@react-navigation/native";
import { Restaurant } from "src/services/restaurant/restaurant.context";

export const RestaurantInfoCard = ({ restaurant = {} as Restaurant }) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    ],
    address = "100 some random street",
    isOpenNow = false,
    rating = 4,
    isClosedTemporarily = false,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  const navigation = useNavigation();

  return (
    <>
      <RestaurantInfoCardContainer
        key={restaurant.name}
        elevation={5}
        onPress={() =>
          navigation.navigate("RestaurantDetail", {
            restaurant,
          })
        }
      >
        <Favorite restaurant={restaurant} />
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
