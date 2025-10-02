import AsyncStorage from "@react-native-async-storage/async-storage";
    

const API_URL = 'http://192.168.1.96:8080'

export async function getAcquiredTours() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return [];

    const response = await fetch(`${API_URL}/api/tours/acquired`, {
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

export const saveTour = async (ID) => {

  try {
    const token = await AsyncStorage.getItem("token")
    if (!token) return

    const response = await fetch(`${API_URL}/api/tours/${ID}/acquire`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,

        }
    })

    if (!response.ok) {
      // throw error
    }
  } catch (e) {
    // throw error
  }
}

export const removeTour = async (ID) => {

  try {
    const token = await AsyncStorage.getItem("token")
    if (!token) return

    const response = await fetch(`${API_URL}/api/tours/${ID}/remove`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,

        }
    })

    if (!response.ok) {
    }

  } catch (e) {
  }
}

export async function getAllTours() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return [];

    const response = await fetch(`${API_URL}/api/tours/alltours`, {
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
    return [];

  }
}

export async function getTourLocations(tourId) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return [];

    const response = await fetch(`${API_URL}/api/tours/${tourId}/locations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to fetch locations");
    }

    const locations = await response.json();
    console.log(locations)
    return Array.isArray(locations) ? locations : [];
  } catch (err) {
    console.error("Error fetching locations:", err);
    return [];
  }
}

export async function searchTours(query) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return [];

    const response = await fetch(`${API_URL}/api/tours/search?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if ([404, 204].includes(response.status)) return [];
      const text = await response.text();
    }

    const tours = await response.json();
    return Array.isArray(tours) ? tours : [];
  } catch (err) {
    return [];
  }
}