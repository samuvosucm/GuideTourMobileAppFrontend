import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TourCardComponent({ tour, source = 'library' }) {

  const numericRating = Number(tour.rating);
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate("TourDetailScreen", { tour, source });
  };

  return (
    <TouchableOpacity
      style={styles.card} 
      activeOpacity={0.8}
      onPress={handleOnPress}
    >
      <Image 
        source={{ uri: tour.thumbnailUrl }} 
        style={styles.image} 
        resizeMode="cover" 
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {tour.title}
        </Text>

          <View style={styles.ratingCityRow}>
        {/* Show rating only if it exists */}
        {(tour.rating !== null && tour.rating !== undefined) && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" color="#FFD700" size={16} />
              <Text style={styles.ratingText}>
                {numericRating.toFixed(1)} ({tour.reviews ?? 0})
              </Text>
            </View>
        )}
        <View style={styles.cityContainer}>
            <Text style={styles.cityTag}>{tour.country}</Text>
            </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    margin: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 130,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    color: '#222',
  },
  ratingCityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 4,
  },
  cityContainer: {
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  cityTag: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
});
