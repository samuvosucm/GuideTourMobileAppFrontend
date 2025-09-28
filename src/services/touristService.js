import AsyncStorage from "@react-native-async-storage/async-storage";
    

const API_URL = 'http://192.168.1.22:8080'

export const saveTour = async (ID) => {

    const response = await fetch(`${API_URL}/api/${ID}/purchase`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        
    })
}

