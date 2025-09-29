import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import { saveTour } from "../../services/touristService";

export default function TourDetailScreen({ navigation }) {
  const route = useRoute();
  const { tour, source } = route.params;
  const { user } = useContext(AuthContext);

  const [currentSource, setCurrentSource] = useState(source)

  const handleBuyPress = async () => {
    if (currentSource === 'owned') {
      navigation.navigate("TourViewPointScreen", { tour });
    }
    else if (currentSource === 'library') {
      console.log("saving")
      await saveTour(tour.id)
      setCurrentSource("owned")
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: tour.thumbnailUrl }} style={styles.image} resizeMode="cover" />

      <Text style={styles.title}>{tour.title}</Text>

      <View style={styles.infoRow}>
        <View style={styles.leftInfo}>
          {/* Show rating only if it exists */}
          {(tour.rating !== null && tour.rating !== undefined) && (
            <Text style={styles.rating}>
              {Number(tour.rating).toFixed(1)} ⭐ ({tour.reviews ?? 0} reviews)
            </Text>
          )}

          {/* Show city only if it exists */}
          {tour.country && <Text style={styles.city}>{tour.country}</Text>}
        </View>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
          <Text style={styles.buyText}>
            {user.role === 'tourist'
              ? currentSource === "library" ? 'Save Tour' : 'Play Tour'
              : 'Edit tour'}
          </Text>
        </TouchableOpacity>
      </View>

      {tour.description && (
        <Text style={styles.description}>{tour.description}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  image: {
    width: "100%",
    height: 280,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#222",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  leftInfo: {
    flex: 1,
  },
  rating: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
    marginBottom: 6,
  },
  city: {
    fontSize: 14,
    color: "#777",
  },
  buyButton: {
    backgroundColor: "#b05454",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    shadowColor: "#b05454",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buyText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 24,
    marginHorizontal: 20,
    marginBottom: 40,
  },
});
