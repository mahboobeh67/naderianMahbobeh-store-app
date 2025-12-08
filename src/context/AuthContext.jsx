import { createContext, useContext, useEffect, useState } from "react";
import {
  loadTokens,
  saveTokens,
  clearTokens,
  getAccessToken,
} from "../services/tokenStorage";
import apiClient from "@/lib/apiClient";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // اطلاعات کاربر
  const [loading, setLoading] = useState(true); // برای auto-login
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ===============================================
  // 🟦 Auto Login هنگام رفرش صفحه (Load Tokens)
  // ===============================================
  useEffect(() => {
    const stored = loadTokens();

    if (stored?.accessToken) {
      setIsAuthenticated(true);

      // Optional: گرفتن اطلاعات کاربر
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // ============================
  // 🟩 LOGIN FUNCTION
  // ============================
  async function login(username, password) {
    const res = await apiClient.post("/auth/login", {
      username,
      password,
    });

    saveTokens(
      res.data.accessToken,
      res.data.refreshToken,
      res.data.expiresAt
    );

    setIsAuthenticated(true);
    fetchProfile();

    return res.data;
  }

  // ============================
  // 🟥 LOGOUT FUNCTION
  // ============================
  async function logout() {
    try {
      await apiClient.post("/auth/logout");
    } catch {}

    clearTokens();
    setIsAuthenticated(false);
    setUser(null);
  }

  // ============================
  // 🟨 FETCH PROFILE (Protected)
  // ============================
  async function fetchProfile() {
    try {
      const res = await apiClient.get("/auth/profile");
      setUser(res.data.user);
    } catch {
      // اگر توکن نامعتبر بود → logout
      clearTokens();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
