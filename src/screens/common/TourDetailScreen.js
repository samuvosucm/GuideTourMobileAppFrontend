import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";

export default function TourDetailScreen({ navigation }) {
  const route = useRoute();
  const { tour, source } = route.params
  const { user } = useContext(AuthContext)

  const handleBuyPress = () => {


    if (source === 'owned') {
      navigation.navigate("TourViewPointScreen", {tour})
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={tour.image} style={styles.image} resizeMode="cover" />

      <Text style={styles.title}>{tour.title}</Text>

      <View style={styles.infoRow}>
        <View style={styles.leftInfo}>
          <Text style={styles.rating}>{tour.rating} ⭐ ({tour.reviews} reviews)</Text>
          {tour.city && <Text style={styles.city}>{tour.city}</Text>}
        </View>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
          <Text style={styles.buyText}>{
          
            user.role === 'tourist' ?
              source === "library" ? 'Save Tour' : 'Play Tour' 
            : 'Edit tour'
          }</Text>
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
    backgroundColor: "#f2f2f7", // subtle light background
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
