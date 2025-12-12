// src/services/productService.js
import apiClient from "./apiClient";

const productService = {
  async getList(params) {
    return apiClient.getAll("/products", { params });
  },
  async getOne(id) {
    return apiClient.get(`/products/${id}`);
  },
  async create(data) {
    return apiClient.post("/products", data);
  },
  async update(id, data) {
    return apiClient.put(`/products/${id}`, data);
  },
  async delete(id) {
    return apiClient.delete(`/products/${id}`);
  },
};

export default productService;




