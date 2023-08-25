import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfo } from "../components/restaurant-info.component";

export const RestaurantsScreen = () => {
  const [searchVal, setSearchVal] = useState("");
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.search}>
        <Searchbar
          mode="bar"
          value={searchVal}
          placeholder="Search"
          onChangeText={setSearchVal}
        />
      </View>
      <View style={styles.listContainer}>
        <RestaurantInfo />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 16,
  },
  safeContainer: {
    flex: 1,
    borderWidth: 1,
    marginTop: StatusBar.currentHeight,
  },
  search: {
    padding: 8,
  },
  listContainer: { flex: 1, borderWidth: 1, backgroundColor: "blue" },
});
