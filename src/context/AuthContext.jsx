import { createContext, useContext, useEffect, useState } from "react";
import {
  getAccessToken,
  saveTokens,
  clearTokens,
} from "../services/tokenStorage";


import apiClient from "@/services/apiClient";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);    
  const [loading, setLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ===============================================
  // 🔵 Auto Login — only accessToken, no refreshToken
  // ===============================================
  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      setLoading(false);
      return;
    }

    // تست اعتبار توکن
    fetchProfile();
  }, []);

  // ===============================================
  // 🟢 LOGIN
  // ===============================================
  async function login(username, password) {
    const data = await apiClient.post("/auth/login", {
      username,
      password,
    });

    // data = { accessToken: "...", user: {...} }
    saveTokens(data.accessToken);

    setIsAuthenticated(true);
    setUser(data.user);

    return data.user;
  }

  // ===============================================
  // 🔴 LOGOUT
  // ===============================================
  async function logout() {
    try {
      await apiClient.post("/auth/logout");
    } catch {}

    clearTokens();
    setIsAuthenticated(false);
    setUser(null);
  }

  // ===============================================
  // 🟡 FETCH PROFILE (Protected)
  // ===============================================
  async function fetchProfile() {
    try {
      const data = await apiClient.get("/auth/profile");
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

