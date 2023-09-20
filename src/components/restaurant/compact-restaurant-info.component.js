import React from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { Text } from "../typography/text.component";
import { WebView } from "react-native-webview";

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({ restaurant, isMap }) => {
  const photoURI = restaurant.photos?.[0];
  const Image = isAndroid && isMap ? CompactWebview : CompactImage;
  return (
    <Item key={restaurant.name}>
      {photoURI && (
        <Image source={{ key: photoURI, uri: restaurant.photos[0] }} />
      )}
      <Text>{restaurant?.name}</Text>
    </Item>
  );
};

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
