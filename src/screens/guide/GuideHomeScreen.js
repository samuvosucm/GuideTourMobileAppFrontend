import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../utils/components/searchBarComponent";
import TourCardComponent from "../../utils/components/tourCardComponent";

export default function TouristHomeScreen() {

  const tours = [
    {title: 'Famous Places', image: require('../../../assets/budapest.jpg'), rating: '4.7', reviews: '23', city: 'Budapest', description: "City Tour through Budapest most famous places blablabla"},
    {title: 'Prague City Tour', image: require('../../../assets/prague.jpg'), rating: '4', reviews: '7', city: 'Prague', description: "City Tour through Prague most famous places blablabla"},
  ];

  // 🔹 función para crear tour
  const onCreateTourPressed = () => {
    console.log("Create tour button pressed");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Tours</Text>
          <Text style={styles.subtitle}>Explore your created tours</Text>
        </View>
        <SearchBar />

        <FlatList
          data={tours}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.column}>
              <TourCardComponent
                tour={item}
                source="owned"
              />
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
        <TouchableOpacity style={styles.fab} onPress={onCreateTourPressed}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
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
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#b05454ff',
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 2,
  },
});
