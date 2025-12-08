// src/services/userService.js
import apiClient from "@/lib/apiClient";

export default {
  getProfile() {
    return apiClient.get("/user/profile");
  },
  updateProfile(data) {
    return apiClient.put("/user/profile", data);
  },
  changePassword(data) {
    return apiClient.post("/user/change-password", data);
  },
  getAll(params) {
    return apiClient.get("/users", { params });
  },
  getOne(id) {
    return apiClient.get(`/users/${id}`);
  }
};
