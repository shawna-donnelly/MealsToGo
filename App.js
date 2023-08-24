import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Search</Text>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.text}>List</Text>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 16,
  },
  safeContainer: {
    flex: 1,
    borderWidth: 1,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    borderWidth: 1,
    backgroundColor: "green",
  },
  listContainer: { flex: 1, borderWidth: 1, backgroundColor: "blue" },
});
