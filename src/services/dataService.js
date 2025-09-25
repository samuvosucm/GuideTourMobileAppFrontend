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