import apiClient from "@/lib/apiClient";

export function fetchProducts(params) {
  return apiClient
    .get("/products", { params })
    .then(res => res.data); 
}
