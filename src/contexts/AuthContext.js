import React, { createContext, useState, useEffect } from "react";
import { getToken, signOut, signIn, signUp } from "../services/dataService";
import { getCurrentUser } from '../services/touristService'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // app loading state

  // On app start, check if token exists and fetch user
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (err) {
        console.error("Auth init failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    const loggedInUser = await signIn(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  };

  // SignUp function
  const register = async (data) => {
    const newUser = await signUp(data);
    setUser(newUser);
    return newUser;
  };

  // Logout function
  const logOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
