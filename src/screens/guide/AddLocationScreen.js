import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createTour } from "../../services/guideService";

export default function AddLocationScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { tourData, thumbnail } = route.params;

  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [media, setMedia] = useState([]);

  // Pick images from gallery
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Gallery access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setMedia([...media, ...result.assets.map((a) => a.uri)]);
    }
  };

  // Open map picker
  const chooseLocationOnMap = () => {
    navigation.navigate("MapPickerScreen", {
      onLocationSelected: ({ lat, lng }) => {
        setLatitude(lat);
        setLongitude(lng);
      },
    });
  };

  // Add location to list
  const addLocation = () => {
    if (!name || latitude === null || longitude === null) {
      Alert.alert(
        "Missing data",
        "Name and location (latitude & longitude) are required."
      );
      return;
    }

    setLocations([
      ...locations,
      { name, latitude, longitude, description, media },
    ]);

    setName("");
    setDescription("");
    setLatitude(null);
    setLongitude(null);
    setMedia([]);
  };

const submitTour = async () => {
  const fullTour = { ...tourData, locations };

  try {
    const response = await createTour(fullTour, thumbnail);
    console.log("Tour created successfully:", response);
    Alert.alert("Tour Created", "Tour with locations added successfully!");
    navigation.navigate("GuideScreen")
  } catch (error) {
    Alert.alert("Error", error.message || "Failed to create tour");
  }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={styles.header}>Add Locations</Text>

            <TextInput
              style={styles.input}
              placeholder="Location name"
              value={name}
              onChangeText={setName}
            />

            <TouchableOpacity style={styles.mapButton} onPress={chooseLocationOnMap}>
              <Text style={styles.mapButtonText}>
                {latitude && longitude
                  ? `Selected: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
                  : "Choose location on map"}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={[styles.input, styles.multiline]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <TouchableOpacity style={styles.addMediaButton} onPress={pickImages}>
              <Text style={styles.addMediaText}>Pick Images from Gallery</Text>
            </TouchableOpacity>
            <View style={styles.mediaPreview}>
              {media.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.mediaImage} />
              ))}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={addLocation}>
              <Text style={styles.addText}>+ Add Location</Text>
            </TouchableOpacity>

            <Text style={styles.header2}>Current Locations</Text>
          </View>
        }
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.locationCard}>
            <Text style={styles.locationText}>{item.name}</Text>
            <Text style={styles.locationSub}>
              Lat: {item.latitude.toFixed(5)} | Lng: {item.longitude.toFixed(5)}
            </Text>
            <Text numberOfLines={1} style={styles.locationSub}>
              {item.description}
            </Text>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.submitButton} onPress={submitTour}>
            <Text style={styles.submitText}>Finish & Create Tour</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 10, color: "#222" },
  header2: { fontSize: 18, fontWeight: "600", marginTop: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  multiline: { height: 80, textAlignVertical: "top" },
  addButton: {
    backgroundColor: "#555",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  locationCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  locationText: { fontWeight: "700", fontSize: 16 },
  locationSub: { fontSize: 12, color: "#555" },
  submitButton: {
    backgroundColor: "#b05454ff",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    margin: 20,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  mapButton: {
    backgroundColor: "#3399ff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  mapButtonText: { color: "#fff", fontWeight: "600" },

  addMediaButton: {
    backgroundColor: "#555",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  addMediaText: { color: "#fff", fontWeight: "600" },
  mediaPreview: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  mediaImage: { width: 60, height: 60, marginRight: 8, marginBottom: 8, borderRadius: 8 },
});
