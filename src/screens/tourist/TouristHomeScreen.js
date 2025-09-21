import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../utils/components/searchBarComponent";
import TourCardComponent from "../../utils/components/tourCardComponent";

export default function TouristHomeScreen() {

    const tours = [
      {title: 'Famous Places', image: require('../../../assets/budapest.jpg'), rating: '4.7', reviews: '23', city: 'Budapest', description: "City Tour through Budapest most famous places blablabla"},
      {title: 'Prague City Tour', image: require('../../../assets/prague.jpg'), rating: '4', reviews: '7', city: 'Prague', description: "City Tour through Prague most famous places blablabla"},
    ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Tours</Text>
          <Text style={styles.subtitle}>Explore your booked tours</Text>
        </View>
        <SearchBar/>

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
    paddingHorizontal: 20,
    paddingTop: 40,
    flex: 1,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  column: {
    flex: 1,
    margin: 1,
    maxWidth: '50%', 
  },
});
