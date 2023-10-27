import React, { useContext, useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantContext } from "../../../services/restaurant/restaurant.context";
import { MapCallout } from "../components/map-callout.component";
import { useNavigation } from "@react-navigation/native";
import { SafeArea } from "../../../components/utility/safe-area.component";

export const RestaurantMap = () => {
  const navigation = useNavigation();
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantContext);
  const { lat, lng, viewport } = location;
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    if (!!location && !!viewport) {
      const northeastLat = viewport.northeast?.lat || 0;
      const southwestLat = viewport.southwest?.lat || 0;
      const ld = northeastLat - southwestLat;
      setLatDelta(ld);
    }
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

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);

  if (!location) {
    return (
      <SafeArea>
        <Map
          region={{
            latitude: 0,
            longitude: 0,
          }}
        />
      </SafeArea>
    );
  }
  return <RestaurantMap navigation={navigation} />;
};
