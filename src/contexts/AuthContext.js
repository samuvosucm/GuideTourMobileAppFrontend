import React, { createContext, useState, useEffect } from "react";
import { getToken, signOut, signIn, signUp } from "../services/dataService";
import { getCurrentUser } from "../services/touristService";
import UserDTO from "../dto/UserDTO";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          const currentUser = await getCurrentUser();
          setToken(token);
          setUser(currentUser);
        }
      } catch (err) {
        console.error("Auth init failed:", err);
        setUser(null);
        setToken(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    const data = await signIn(credentials);
    setUser(data);
    setToken(data.jwtToken);
    return data;
  };

  // SignUp function
  const register = async (data) => {
    const newUser = await signUp(data);
    const userDTO = new UserDTO({
      email: newUser.email,
      role: newUser.role,
      id: newUser.userId,
    })

    setUser(userDTO)
    setToken(newUser.jwtToken);
    console.log(newUser)
    return userDTO;
  };

  // Logout function
  const logOut = async () => {
    await signOut();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        loading,
        login,
        register,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
