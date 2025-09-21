import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../utils/components/searchBarComponent";
import FilterComponent from "../../utils/components/filterComponent";
import TourCardComponent from "../../utils/components/tourCardComponent";

export default function TouristToursScreen() {

    const tours = [
      {title: 'Famous Places', image: require('../../../assets/budapest.jpg'), rating: '4.7', reviews: '23', city: 'Budapest', description: "City Tour through Budapest most famous places blablabla"},
      {title: 'Prague City Tour', image: require('../../../assets/prague.jpg'), rating: '4', reviews: '7', city: 'Prague', description: "City Tour through Prague most famous places blablabla"},
    ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar />
        <View style={styles.filters}>
            <FilterComponent name="Country" />
        </View>
        <FlatList
          data={tours}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.column}>
              <TourCardComponent
                tour = {item}
              />
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 10 
  },
  column: {
    flex: 1,
    margin: 1,
    maxWidth: '50%', 
  },
});
