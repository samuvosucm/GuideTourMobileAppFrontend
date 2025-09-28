import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'http://192.168.1.22:8080';

export async function getMyTours() {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return []; // devolvemos vacío
    }

    // Call backend endpoint
    const response = await fetch(`${API_URL}/api/tours/mytours`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // include JWT
      },
    });

    // Si no hay tours o endpoint devuelve error → devolvemos []
    if (!response.ok) {
      throw new Error(`Failed to fetch tours: ${response.status} - ${text}`);

      // si es 404, 409 o similar devolvemos []
      if ([404, 409, 204].includes(response.status)) {
        return [];
      }

      // si es otro error real (500 etc.), entonces sí lanzamos
      const text = await response.text();
      throw new Error(`Failed to fetch tours: ${response.status} - ${text}`);
    }

    // Parse JSON response
    const tours = await response.json();
    return Array.isArray(tours) ? tours : [];
  } catch (error) {
    console.error("Error fetching current tours:", error);
    // devolvemos [] en caso de fallo para no romper la app
    return [];
  }
}

export async function createTour(tourData) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_URL}/api/tours/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tourData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create tour: ${response.status} - ${errorText}`);
    }

    const successResponse = await response.json();
    return successResponse;
  } catch (error) {
    console.error("Error creating tour:", error);
    throw error;
  }
}
