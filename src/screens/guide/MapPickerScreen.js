import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MapPickerScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const onLocationSelected = route.params?.onLocationSelected;

  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  const handleConfirm = () => {
    if (!marker) {
      Alert.alert("Select a location first");
      return;
    }
    onLocationSelected({ lat: marker.latitude, lng: marker.longitude });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Map */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.8566, // default: Paris
          longitude: 2.3522,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

      {/* Confirm button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  confirmButton: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#b05454ff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
