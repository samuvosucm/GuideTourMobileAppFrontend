import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import { saveTour, removeTour } from "../../services/touristService";

export default function TourDetailScreen({ navigation }) {
  const route = useRoute();
  const { tour, source } = route.params;
  const { user } = useContext(AuthContext);

  const [currentSource, setCurrentSource] = useState(source);

  const handleSaveOrPlayPress = async () => {
    if (currentSource === "owned") {
      navigation.navigate("TourViewPointScreen", { tour });
    } else if (currentSource === "library") {
      try {
        await saveTour(tour.id);
        setCurrentSource("owned");
      } catch (err) {
        console.error("Error saving tour:", err);
      }
    }
  };

  const handleDeletePress = async () => {
    Alert.alert(
      "Remove Tour",
      "Are you sure you want to delete this tour from your saved list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await removeTour(tour.id);
              navigation.goBack(); // go back to refresh the list
            } catch (err) {
              console.error("Error removing tour:", err);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tour Thumbnail */}
      <Image source={{ uri: tour.thumbnailUrl }} style={styles.image} resizeMode="cover" />

      {/* Title */}
      <Text style={styles.title}>{tour.title}</Text>

      {/* Info + Actions */}
      <View style={styles.infoRow}>
        <View style={styles.leftInfo}>
          {tour.rating !== null && tour.rating !== undefined && (
            <Text style={styles.rating}>
              {Number(tour.rating).toFixed(1)} ⭐ ({tour.reviews ?? 0} reviews)
            </Text>
          )}
          {tour.country && <Text style={styles.city}>{tour.country}</Text>}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSaveOrPlayPress}>
            <Text style={styles.actionText}>
              {user.role === "tourist"
                ? currentSource === "library"
                  ? "Save Tour"
                  : "Play Tour"
                : "Edit Tour"}
            </Text>
          </TouchableOpacity>

          {currentSource === "owned" && (
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDeletePress}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Description */}
      {tour.description && <Text style={styles.description}>{tour.description}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  image: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    color: "#444",
    fontWeight: "600",
    marginBottom: 6,
  },
  city: {
    fontSize: 14,
    color: "#777",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#4a90e2",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#e94f37",
    shadowColor: "#e94f37",
  },
  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 24,
    marginHorizontal: 20,
    marginBottom: 40,
  },
});
