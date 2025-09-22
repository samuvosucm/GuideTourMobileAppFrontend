const API_URL = ''

export const saveTour = async (ID) => {

    const response = await fetch(`${API_URL}/api/${ID}/purchase`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        
    })
}