// src/services/authService.js
// src/services/authService.js
import apiClient from "@/lib/apiClient";

export const authService = {
  async login(data) {
    return apiClient.post("/auth/login", data);
  },

  async register(data) {
    return apiClient.post("/auth/register", data);
  },

  async getProfile() {
    return apiClient.get("/auth/me");
  },

  logout() {
    localStorage.removeItem("auth");
  },
};
