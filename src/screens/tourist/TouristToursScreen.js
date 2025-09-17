import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../utils/components/searchBarComponent";
import FilterComponent from "../../utils/components/filterComponent";
import TourCardComponent from "../../utils/components/tourCardComponent";

export default function TouristToursScreen() {

  const tours = [
    {title: 'Famous Budapest Places', image: require('../../../assets/budapest.jpg'), rating: '4.7', reviews: '23', price: '1.99'},
    {title: 'Prague City Tour', image: require('../../../assets/prague.jpg'), rating: '4', reviews: '7', price: '2.99'},
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar />
        <View style={{flexDirection:'row'}}>
            <FilterComponent name="Country" />
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
                price={item.price}
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
  column: {
    flex: 1,
    margin: 5,
    maxWidth: '50%', 
  },
});
