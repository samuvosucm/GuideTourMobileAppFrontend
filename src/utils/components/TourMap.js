// components/TourMap.js
import React from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

export default function TourMap({ points, currentIndex, onSelectPoint }) {
  if (!points || points.length === 0) return null;

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: points[0].latitude,
        longitude: points[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {points.map((p, i) => {
        const isSelected = i === currentIndex;

        return (
          <Marker
            key={i}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
            onPress={() => onSelectPoint(i)}
            pinColor="red"
            style={{
              transform: [{ scale: isSelected ? 1.5 : 1 }],
            }}
          >
            <Callout
                tooltip
                style={{ display: 'none' }}
            >
                <View>
                    <Text>
                        Hidden
                    </Text>
                </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
}
