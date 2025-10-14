import React, { createContext, useState, useEffect } from "react";
import { loginUser, signupUser, verifyToken, logoutUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ provjera tokena kad se app pokrene
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const email = await verifyToken();
        setUser(email);
      } catch {
        logoutUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // ✅ login
  const login = async (email, password) => {
    const token = await loginUser(email, password);
    const verifiedEmail = await verifyToken();
    setUser(verifiedEmail);
  };

  // ✅ signup
  const signup = async (name, surname, username, email, password, education, isActive) => {
    const token = await signupUser(name, surname, username, email, password, education,isActive);
    const verifiedEmail = await verifyToken();
    setUser(verifiedEmail);
  };

  // ✅ logout
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
