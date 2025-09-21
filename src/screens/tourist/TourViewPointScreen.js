import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

export default function TourViewPointScreen() {
  const route = useRoute();

  const points =
    route?.params?.points ?? (route?.params?.point ? [route.params.point] : SAMPLE_POINTS);

  const [currentIndex, setCurrentIndex] = useState(0);
  const point = points?.[currentIndex];
  const [visibleMedia, setVisibleMedia] = useState(null); // null | 'image' | 'video' | 'audio'

  // bottom sheet ref + snap points
  const bottomSheetRef = useRef(null);
  // 0 => peek (15%), 1 => expanded (85%)
  const snapPoints = useMemo(() => ['15%', '85%'], []);

  // helpers
  const hasImages = Array.isArray(point?.images) ? point.images.length > 0 : !!point?.image;
  const hasVideo = !!point?.video;
  const hasAudio = !!point?.audio;

  const getImageSource = useCallback((img) => {
    if (!img) return { uri: 'https://via.placeholder.com/300x300?text=No+Image' };
    if (typeof img === 'string') return { uri: img };
    return img;
  }, []);

  const switchToIndex = (index) => {
    const clamped = Math.max(0, Math.min(points.length - 1, index));
    setCurrentIndex(clamped);
    setVisibleMedia(null);
    // opcional: al cambiar, abrimos a expanded
    try {
      bottomSheetRef.current?.snapToIndex(0);
    } catch (e) {
      /* ignore */
    }
  };

  const renderImagesPanel = () => {
    const images = Array.isArray(point?.images) && point.images.length > 0
      ? point.images
      : point?.image
      ? [point.image]
      : [];

    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <Image
          source={getImageSource(images[0])}
          style={styles.mediaImageFull}
          resizeMode="cover"
        />
      );
    }

    return (
      <View style={styles.galleryContainer}>
        
        <View style={{ flexDirection: 'row' }}>
          {images.map((it, i) => (
            <Image
              key={String(i)}
              source={getImageSource(it)}
              style={styles.galleryImage}
              resizeMode="cover"
            />
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

  // If there are no points, show fallback
  if (!points || points.length === 0) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
       
        <Text>No hay puntos para mostrar.</Text>
     
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Map placeholder. Change later with MapView. */}
      <View style={styles.mapContainer} pointerEvents="none">
        <Text style={styles.mapText}>MAP (placeholder) — Here we'll have MapView</Text>
      </View>

      
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
      >
        {/* Use BottomSheetScrollView to allow inner scrolling which coordinates
            with the sheet gestures. */}
        <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
          {/* HEADER */}
          <View style={styles.headerRow}>
            {point?.image ? (
              <Image source={getImageSource(point.image)} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Ionicons name="image" size={34} color="#888" />
              </View>
            )}

            <View style={styles.titleColumn}>
              <Text style={styles.title} numberOfLines={2}>{point?.name ?? 'Sin nombre'}</Text>
              <Text style={styles.subtitle} numberOfLines={1}>{point?.subtitle ?? ''}</Text>
            </View>
          </View>

          {/* DESCRIPTION */}
          <Text style={styles.description}>{point?.description ?? 'No description'}</Text>

          {/* MEDIA BUTTONS */}
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

          {/* INLINE MEDIA VIEWER */}
          <View style={styles.inlineMediaArea}>
            {visibleMedia === 'image' && renderImagesPanel()}
            {(visibleMedia === 'video' || visibleMedia === 'audio') && renderVideoOrAudio()}
          </View>

          {/* Extra spacing so that you can scroll the content when the sheet
              is expanded. */}
          <View style={{ height: 120 }} />

          {/* NAV BUTTONS: */}
          <View style={styles.navButtonsFixed} pointerEvents="box-none">
            <TouchableOpacity
              style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
              onPress={() => switchToIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
            >
              <Ionicons name="chevron-back" size={18} color={currentIndex === 0 ? '#bbb' : '#000'} />
              <Text style={[styles.navButtonText, currentIndex === 0 && styles.navButtonTextDisabled]}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, currentIndex === points.length - 1 && styles.navButtonDisabled]}
              onPress={() => switchToIndex(currentIndex + 1)}
              disabled={currentIndex === points.length - 1}
            >
              <Text style={[styles.navButtonText, currentIndex === points.length - 1 && styles.navButtonTextDisabled]}>Next</Text>
              <Ionicons name="chevron-forward" size={18} color={currentIndex === points.length - 1 ? '#bbb' : '#000'} />
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Sample data
// -----------------------------------------------------------------------------
const SAMPLE_POINTS = [
  {
    name: 'Parliament Building',
    subtitle: 'Budapest · Danube riverside',
    description: 'A historic and iconic building completed in the late 19th century.',
    image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800',
    images: [
      'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800',
      'https://images.unsplash.com/photo-1505765053744-8b03b6f9f1d4?w=800',
    ],
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    name: 'Chain Bridge',
    subtitle: 'Budapest · Danube',
    description: 'The famous suspension bridge connecting Buda and Pest.',
    image: 'https://images.unsplash.com/photo-1505765053744-8b03b6f9f1d4?w=800',
    images: [],
    video: null,
    audio: null,
  },
];

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  center: { justifyContent: 'center', alignItems: 'center' },

  // Map placeholder (change for MapView)
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eaf4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: { color: '#1b4965', fontWeight: '700' },

  // sheet content
  sheetContent: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },

  headerRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 86, height: 86, borderRadius: 43, backgroundColor: '#ddd', marginRight: 14 },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' },
  titleColumn: { flex: 1 },
  title: { fontSize: 20, fontWeight: '700', color: '#222' },
  subtitle: { fontSize: 13, color: '#666', marginTop: 4 },
  description: { marginTop: 16, fontSize: 15, lineHeight: 22, color: '#444' },

  // MEDIA BUTTONS
  buttonsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 22, paddingVertical: 10, paddingHorizontal: 0 },
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

  // Nav buttons fixed at bottom of the sheet
  navButtonsFixed: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: Platform.OS === 'ios' ? 80 : 60, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 18, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e6e6e6' },
  navButtonDisabled: { backgroundColor: '#f3f3f4', borderColor: '#e6e6e6' },
  navButtonText: { color: '#000', fontWeight: '700', marginHorizontal: 8 },
  navButtonTextDisabled: { color: '#999' },
});
