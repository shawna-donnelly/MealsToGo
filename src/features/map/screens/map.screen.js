import React, { useContext, useEffect, useState } from "react";
import { Platform, Text, View, Image } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantContext } from "../../../services/restaurant/restaurant.context";
import { MapCallout } from "../components/map-callout.component";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

export const MapScreen = () => {
  const navigation = useNavigation();
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantContext);
  const { lat, lng, viewport } = location;
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    const ld = northeastLat - southwestLat;
    setLatDelta(ld);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants?.map((restaurant) => {
          return (
            <>
              <Marker
                key={`${restaurant.name}_marker`}
                coordinate={{
                  latitude: restaurant.geometry.location.lat,
                  longitude: restaurant.geometry.location.lng,
                }}
              >
                <Callout
                  onPress={() =>
                    navigation.navigate("RestaurantDetail", {
                      restaurant: restaurant,
                    })
                  }
                >
                  <MapCallout restaurant={restaurant} />
                </Callout>
              </Marker>
            </>
          );
        })}
      </Map>
    </>
  );
};

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
