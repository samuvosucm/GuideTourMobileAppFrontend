import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'http://192.168.1.22:8080'

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (e) {
    return 0;
  }
};

export const signUp = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error("Email already in use")
        }

        const data = await response.json();

        if (data?.jwtToken) {
            await AsyncStorage.setItem('token', data.jwtToken)

        }

        return data;
    } catch (error) {

        throw error
    }
}

export const signIn = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            throw new Error("Invalid Email or Password")
        }
        const data = await response.json();
        if (data?.jwtToken) {
            await AsyncStorage.setItem('token', data.jwtToken)
        }
        return data;

    } catch (error) {
        throw error
    }
}

export const signOut = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok)
    {
        await AsyncStorage.removeItem("token")
    }
}

export const handlePasswordRecovery = async (userData) => {

}


export async function getCurrentUser() {
  try {
        // Get token from AsyncStorage
        const token = await AsyncStorage.getItem("token");

        if (!token) {
        // en caso de que no haya token (seria extraño), habria que cerrar la sesion
        }

        // Call backend endpoint
        const response = await fetch(`${API_URL}/api/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // include JWT
        },
        });

        if (!response.ok) {
            //no tiene sentido estar lanzando errores porque colapsa la aplicacion
            // aqui habria que quitar este error y poner algun tipo de mensaje de error en la pantalla, o cerrar sesion
                const text = await response.text();

            console.log("Error fetching user:", text);
            throw new Error(`Failed to fetch user: ${response.status}`);
        }

        // Parse JSON response
        const user = await response.json();
        return user;
    } catch (error) {
        //Lo mismo, no tiene sentido lanzar errores
        console.error("Error fetching current user:", error);
        throw error;
  }
}