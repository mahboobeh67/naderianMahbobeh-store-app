import apiClient from "@/services/apiClient";

const categoryService = {
  getAll() {
    return apiClient.getAll("/categories");
  },
  getOne(id) {
    return apiClient.get(`/categories/${id}`);
  },
  create(payload) {
    return apiClient.post("/categories", payload);
  },
  update(id, payload) {
    return apiClient.put(`/categories/${id}`, payload);
  },
  delete(id) {
    return apiClient.delete(`/categories/${id}`);
  },
};
 export default categoryService