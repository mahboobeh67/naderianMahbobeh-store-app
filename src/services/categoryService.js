// src/services/categoryService.js
import apiClient from "@/lib/apiClient";

export const categoryService = {
  getAll(params) {
    return apiClient.get("/categories", { params });
  },

  getOne(id) {
    return apiClient.get(`/categories/${id}`);
  },

  create(data) {
    return apiClient.post("/categories", data);
  },

  update(id, data) {
    return apiClient.put(`/categories/${id}`, data);
  },

  delete(id) {
    return apiClient.delete(`/categories/${id}`);
  },
};
