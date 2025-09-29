import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../utils/components/searchBarComponent";
import FilterComponent from "../../utils/components/filterComponent";
import TourCardComponent from "../../utils/components/tourCardComponent";
import { getAllTours } from '../../services/touristService'
export default function TouristToursScreen() {

    const [tours, setTours] = useState([]);

    useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getAllTours(); // fetch tours from your service
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
                source = "library"
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
