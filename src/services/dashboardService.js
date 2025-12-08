// src/services/dashboardService.js
import apiClient from "@/lib/apiClient";

export default {
  getStats() {
    return apiClient.get("/dashboard/stats");
  },
  getSales(params) {
    return apiClient.get("/dashboard/sales", { params });
  },
  getRecentOrders(params) {
    return apiClient.get("/dashboard/recent-orders", { params });
  },
  getMessages(params) {
    return apiClient.get("/dashboard/messages", { params });
  }
};
