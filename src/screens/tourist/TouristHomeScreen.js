import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../utils/components/searchBarComponent";
import TourCardComponent from "../../utils/components/tourCardComponent";

export default function TouristHomeScreen() {

    const tours = [
    {title: 'Famous Budapest Places', image: require('../../../assets/budapest.jpg'), rating: '4.7', reviews: '23', price: '1.99'},
    {title: 'Prague City Tour', image: require('../../../assets/prague.jpg'), rating: '4', reviews: '7', price: '2.99'},
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Tours</Text>
          <Text style={styles.subtitle}>Explore your booked and favorite tours</Text>
          <SearchBar/>
        </View>

        <FlatList
          data={tours}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.column}>
              <TourCardComponent
                title={item.title}
                image={item.image}
                rating={item.rating}
                reviews={item.reviews}
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
    marginBottom: 20,
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
    margin: 5,
    maxWidth: '50%', 
  },
});
