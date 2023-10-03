import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card";
import { List } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export const RestaurantDetail = ({ navigation }) => {
  const route = useRoute();
  const { restaurant } = route.params;
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView style={{ flex: 1 }}>
        <List.Accordion
          title="Breakfast"
          id="1"
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title="Item 1" />
          <List.Item title="Item 2" />
        </List.Accordion>
        <List.Accordion
          title="Lunch"
          id="1"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="Item 1" />
          <List.Item title="Item 2" />
          <List.Item title="Item 3" />
        </List.Accordion>
        <List.Accordion
          title="Dinner"
          id="1"
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="Item 1" />
          <List.Item title="Item 2" />
          <List.Item title="Item 3" />
          <List.Item title="Item 4" />
        </List.Accordion>
        <List.Accordion
          title="Drinks"
          id="1"
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title="Item 1" />
          <List.Item title="Item 2" />
          <List.Item title="Item 3" />
          <List.Item title="Item 4" />
          <List.Item title="Item 5" />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};
