const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&;]{8,}$/;
const usernameRegex = /^[A-Za-z][A-Za-z0-9_@#$%;]{2,19}$/;

export default class UserDTO {
    constructor({ email, password, username, role, id}) {
        if (username !== undefined && !usernameRegex.test(username)) throw new Error("Username must start with a letter, 3–20 characters, letters/numbers/_ only")         
        if (email !== undefined && !emailRegex.test(email)) throw new Error("Invalid email format");
        if (password !== undefined && !passwordRegex.test(password)) throw new Error("Password must be at least 8 characters, include uppercase, lowercase, and a number") 
        
        this.id = id
        this.email = email
        this.password = password
        this.username = username
        this.role = role
    }
}