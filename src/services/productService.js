import apiClient from "@/lib/apiClient";

const productService = {
  getList(params) {
    return apiClient.get("/products", { params }).then(r => r.data);
  },

  getOne(id) {
    return apiClient.get(`/products/${id}`).then(r => r.data);
  },

  create(data) {
    return apiClient.post("/products", data).then(r => r.data);
  },

  update(id, data) {
    return apiClient.put(`/products/${id}`, data).then(r => r.data);
  },

  delete(id) {
    return apiClient.delete(`/products/${id}`).then(r => r.data);
  },
};

export default productService



