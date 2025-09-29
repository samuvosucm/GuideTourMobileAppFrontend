import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../utils/components/searchBarComponent";
import TourCardComponent from "../../utils/components/tourCardComponent";
import { getAcquiredTours } from "../../services/touristService";

export default function TouristHomeScreen() {

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getAcquiredTours(); // fetch tours from your service
        console.log(data)
        setTours(data || []); // fallback to empty array
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Tours</Text>
          <Text style={styles.subtitle}>Explore your created tours</Text>
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
                source = "owned"
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
