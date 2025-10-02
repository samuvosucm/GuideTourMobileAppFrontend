import React, { useCallback, useState, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../utils/components/searchBarComponent";
import TourCardComponent from "../../utils/components/tourCardComponent";
import { useFocusEffect } from "@react-navigation/native";
import { searchTours, getAllTours } from '../../services/touristService';

export default function TouristToursScreen() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const debounceRef = useRef(null);

  // Fetch all tours initially
  useFocusEffect(
    useCallback(() => {
      const fetchInitialTours = async () => {
        setLoading(true);
        const data = await getAllTours();
        setTours(data || []);
        setLoading(false);
      };
      fetchInitialTours();
    }, [])
  );

  // Handle search with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        if (!searchText) {
          const allTours = await getAllTours();
          setTours(allTours || []);
        } else {
          const results = await searchTours(searchText);
          setTours(results || []);
        }
      } catch (err) {
        console.error("Error searching tours:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchText]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search tours..."
        />

        {loading && (
          <ActivityIndicator size="large" color="#4a90e2" style={{ marginVertical: 20 }} />
        )}

        <FlatList
          data={tours}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.column}>
              <TourCardComponent
                tour={item}
                source="library"
              />
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !loading && (
              <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Text>No tours found.</Text>
              </View>
            )
          }
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
    margin: 1,
    maxWidth: '50%',
  },
});
