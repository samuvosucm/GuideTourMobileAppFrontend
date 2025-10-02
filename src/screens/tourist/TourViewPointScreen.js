import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import MapView, { Marker } from 'react-native-maps';
import { getTourLocations } from '../../services/touristService';
import LocationDTO from "../../dto/LocationDTO"
import TourMap from '../../utils/components/TourMap';

export default function TourViewPointScreen() {
  const route = useRoute();
  const { tour } = route.params;

  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleMedia, setVisibleMedia] = useState(null); 

  const point = points[currentIndex];
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['15%', '85%'], []);


useEffect(() => {
  const fetchLocations = async () => {
    try {
      const locations = await getTourLocations(tour.id);

      const formatted = locations.map(loc => new LocationDTO(loc));

      const points = formatted.map(loc => ({
        name: loc.name,
        subtitle: loc.category ?? '',
        description: loc.description,
        image: loc.images[0] ?? null,
        images: loc.images,
        video: loc.videos[0] ?? null,
        audio: loc.audios[0] ?? null,
        latitude: loc.latitude,
        longitude: loc.longitude,
      }));

      setPoints(points);
    } catch (err) {
      console.error("Error fetching locations:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchLocations();
}, [tour.id]);


  const hasImages = Array.isArray(point?.images) ? point.images.length > 0 : !!point?.image;
  const hasVideo = !!point?.video;
  const hasAudio = !!point?.audio;

  const getImageSource = (img) => {
    if (!img) return { uri: 'https://via.placeholder.com/300x300?text=No+Image' };
    if (typeof img === 'string') return { uri: img };
    return img;
  };

  const switchToIndex = (index) => {
    const clamped = Math.max(0, Math.min(points.length - 1, index));
    setCurrentIndex(clamped);
    setVisibleMedia(null);
    try {
      bottomSheetRef.current?.snapToIndex(0);
    } catch (e) {}
  };

  const renderImagesPanel = () => {
    const images = Array.isArray(point?.images) && point.images.length > 0
      ? point.images
      : point?.image
      ? [point.image]
      : [];

    if (images.length === 0) return null;
    if (images.length === 1) {
      return <Image source={getImageSource(images[0])} style={styles.mediaImageFull} resizeMode="cover" />;
    }

    return (
      <View style={styles.galleryContainer}>
        <View style={{ flexDirection: 'row' }}>
          {images.map((it, i) => (
            <Image key={String(i)} source={getImageSource(it)} style={styles.galleryImage} resizeMode="cover" />
          ))}
        </View>
      </View>
    );
  };

  const renderVideoOrAudio = () => {
    const source = visibleMedia === 'video' ? point?.video : point?.audio;
    if (!source) return null;
    return (
      <View style={styles.mediaVideoWrap}>
        <Video
          source={typeof source === 'string' ? { uri: source } : source}
          style={visibleMedia === 'audio' ? styles.mediaAudioPlayer : styles.mediaVideoPlayer}
          useNativeControls
          resizeMode="contain"
          isLooping={false}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </SafeAreaView>
    );
  }

  if (!points || points.length === 0) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <Text>No points available for this tour.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
    <TourMap
      points={points}
      currentIndex={currentIndex}
      onSelectPoint={(i) => {
      setCurrentIndex(i);
      bottomSheetRef.current?.snapToIndex(1);
    }}
/>

      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} enablePanDownToClose={false}>
        <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
          <View style={styles.headerRow}>
            {point?.image ? (
              <Image source={getImageSource(point.image)} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Ionicons name="image" size={34} color="#888" />
              </View>
            )}

            <View style={styles.titleColumn}>
              <Text style={styles.title} numberOfLines={2}>
                {point?.name ?? 'No Name'}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {point?.subtitle ?? ''}
              </Text>
            </View>
          </View>

          <Text style={styles.description}>{point?.description ?? 'No description'}</Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.mediaButton, !hasImages && styles.mediaButtonDisabled]}
              disabled={!hasImages}
              onPress={() => setVisibleMedia((v) => (v === 'image' ? null : 'image'))}
            >
              <Ionicons name="image" size={22} color={hasImages ? '#333' : '#aaa'} />
              <Text style={[styles.mediaText, !hasImages && styles.mediaTextDisabled]}>Image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.mediaButton, !hasVideo && styles.mediaButtonDisabled]}
              disabled={!hasVideo}
              onPress={() => setVisibleMedia((v) => (v === 'video' ? null : 'video'))}
            >
              <Ionicons name="videocam" size={22} color={hasVideo ? '#333' : '#aaa'} />
              <Text style={[styles.mediaText, !hasVideo && styles.mediaTextDisabled]}>Video</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.mediaButton, !hasAudio && styles.mediaButtonDisabled]}
              disabled={!hasAudio}
              onPress={() => setVisibleMedia((v) => (v === 'audio' ? null : 'audio'))}
            >
              <Ionicons name="volume-high" size={22} color={hasAudio ? '#333' : '#aaa'} />
              <Text style={[styles.mediaText, !hasAudio && styles.mediaTextDisabled]}>Audio</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inlineMediaArea}>
            {visibleMedia === 'image' && renderImagesPanel()}
            {(visibleMedia === 'video' || visibleMedia === 'audio') && renderVideoOrAudio()}
          </View>

          <View style={{ height: 120 }} />

          <View style={styles.navButtonsFixed} pointerEvents="box-none">
            <TouchableOpacity
              style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
              onPress={() => switchToIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
            >
              <Ionicons
                name="chevron-back"
                size={18}
                color={currentIndex === 0 ? '#bbb' : '#000'}
              />
              <Text
                style={[styles.navButtonText, currentIndex === 0 && styles.navButtonTextDisabled]}
              >
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                currentIndex === points.length - 1 && styles.navButtonDisabled,
              ]}
              onPress={() => switchToIndex(currentIndex + 1)}
              disabled={currentIndex === points.length - 1}
            >
              <Text
                style={[
                  styles.navButtonText,
                  currentIndex === points.length - 1 && styles.navButtonTextDisabled,
                ]}
              >
                Next
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={currentIndex === points.length - 1 ? '#bbb' : '#000'}
              />
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  center: { justifyContent: 'center', alignItems: 'center' },
  mapContainer: { ...StyleSheet.absoluteFillObject },
  sheetContent: { padding: 20, paddingBottom: 40, flexGrow: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 86, height: 86, borderRadius: 43, backgroundColor: '#ddd', marginRight: 14 },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' },
  titleColumn: { flex: 1 },
  title: { fontSize: 20, fontWeight: '700', color: '#222' },
  subtitle: { fontSize: 13, color: '#666', marginTop: 4 },
  description: { marginTop: 16, fontSize: 15, lineHeight: 22, color: '#444' },
  buttonsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 22, paddingVertical: 10 },
  mediaButton: { flex: 1, alignItems: 'center', paddingVertical: 10, marginHorizontal: 0, backgroundColor: '#fff', borderRadius: 12, elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  mediaButtonDisabled: { backgroundColor: '#f3f3f4' },
  mediaText: { marginTop: 6, fontSize: 13, color: '#333', fontWeight: '600' },
  mediaTextDisabled: { color: '#aaa', fontWeight: '500' },
  inlineMediaArea: { marginTop: 10 },
  mediaImageFull: { width: '100%', height: 220, borderRadius: 12, backgroundColor: '#eee' },
  galleryContainer: { paddingVertical: 8 },
  galleryImage: { width: width * 0.6, height: 180, borderRadius: 12, marginRight: 12, backgroundColor: '#eee' },
  mediaVideoWrap: { marginTop: 8, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000' },
  mediaVideoPlayer: { width: '100%', height: 220 },
  mediaAudioPlayer: { width: '100%', height: 60 },
  navButtonsFixed: { position: 'absolute', left: 20, right: 20, bottom: Platform.OS === 'ios' ? 80 : 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  navButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 18, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e6e6e6' },
  navButtonDisabled: { backgroundColor: '#f3f3f4', borderColor: '#e6e6e6' },
  navButtonText: { color: '#000', fontWeight: '700', marginHorizontal: 8 },
  navButtonTextDisabled: { color: '#999' },
});
