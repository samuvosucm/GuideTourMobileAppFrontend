import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadSingleMedia, uploadMultipleMedia } from "./cloudinaryService";

const API_URL = "http://192.168.1.96:8080";

export async function getMyTours() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return [];

    const response = await fetch(`${API_URL}/api/tours/mytours`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if ([404, 409, 204].includes(response.status)) return [];
      const text = await response.text();
      throw new Error(text || "Failed to fetch tours");
    }

    const tours = await response.json();
    return Array.isArray(tours) ? tours : [];
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

export async function createTour(tourData, thumbnailUri) {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    // Upload tour thumbnail if needed
    let uploadedThumbnail = thumbnailUri;
    if (thumbnailUri && !thumbnailUri.startsWith('http')) {
      uploadedThumbnail = await uploadSingleMedia(thumbnailUri);
    }

    // Upload location media
    const locationsWithUploadedMedia = [];
    for (const loc of tourData.locations || []) {
      const uploadedMedia = await uploadMultipleMedia(loc.media || []);
      locationsWithUploadedMedia.push({
        ...loc,
        mediaUrls: uploadedMedia,
      });
    }

    const payload = {
      ...tourData,
      thumbnail: uploadedThumbnail,
      locations: locationsWithUploadedMedia,
    };

    const response = await fetch(`${API_URL}/api/tours/save`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Failed to create tour: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating tour:', error);
    throw error;
  }
}
