import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function CreateTourScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const navigation = useNavigation();

  const askPermissions = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return cameraStatus.status === "granted" && mediaStatus.status === "granted";
  };

  const handlePickImage = async () => {
    const hasPermission = await askPermissions();
    if (!hasPermission) {
      Alert.alert("Permission denied", "Camera and gallery access are required.");
      return;
    }

    Alert.alert("Select Thumbnail", "Choose an option", [
      {
        text: "Camera",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.canceled) setThumbnail(result.assets[0].uri);
        },
      },
      {
        text: "Gallery",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.canceled) setThumbnail(result.assets[0].uri);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleNext = () => {
    if (!title || !country || !description) {
      Alert.alert("Missing fields", "Please fill all fields first.");
      return;
    }
    navigation.navigate("AddLocationScreen", {
      tourData: { title, description, country },
      thumbnail
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Create a Tour</Text>

        <TouchableOpacity style={styles.thumbnailContainer} onPress={handlePickImage}>
          {thumbnail ? (
            <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
          ) : (
            <Text style={styles.plus}>+</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter tour title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter country"
          value={country}
          onChangeText={setCountry}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Enter description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
          <Text style={styles.submitText}>Next: Add Locations</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const CIRCLE_SIZE = 120;
const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 20, color: "#222" },
  thumbnailContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  plus: { fontSize: 40, color: "#fff", fontWeight: "700" },
  thumbnail: { width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: CIRCLE_SIZE / 2 },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
    marginTop: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  multiline: { height: 100, textAlignVertical: "top" },
  submitButton: {
    backgroundColor: "#b05454ff",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
