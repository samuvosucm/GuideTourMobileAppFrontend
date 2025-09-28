import React, { createContext, useState, useEffect } from "react";
import { getToken, signOut, signIn, signUp, getCurrentUser } from "../services/dataService";
import UserDTO from "../dto/UserDTO";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Init on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          setToken(token);
          const currentUser = await getCurrentUser();
          setUser(new UserDTO({
            username: currentUser.username,
            email: currentUser.email,
            role: currentUser.role,
            id: currentUser.id
          }));
        }
      } catch (err) {
        console.error("Auth init failed:", err);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const loginResponse = await signIn(credentials);
      const token = loginResponse.jwtToken;
      setToken(token);

      const currentUser = await getCurrentUser();
      setUser(new UserDTO({
        username: currentUser.username,
        email: currentUser.email,
        role: currentUser.role,
        id: currentUser.id
      }));
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const signUpResponse = await signUp(data);
      const token = signUpResponse.jwtToken;
      setToken(token);

      const currentUser = await getCurrentUser();
      setUser(new UserDTO({
        username: currentUser.username,
        email: currentUser.email,
        role: currentUser.role,
        id: currentUser.id
      }));
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    await signOut();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
