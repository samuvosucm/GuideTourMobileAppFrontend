
const API_URL = ''

export const SignUp = async (userData) => {
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
            throw new Error(`Sign up failed: ${errorText}`)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Sign up failed: ${error}`)
        throw error
    }
}