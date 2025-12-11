// src/services/dashboardService.js
import apiClient from "@/lib/apiClient";

const dashboardBase = "/dashboard";

export default {
  getStats() {
    return apiClient.get(`${dashboardBase}/stats`);
  },
  getSales(params) {
    return apiClient.get(`${dashboardBase}/sales`, { params });
  },
  getRecentOrders(params) {
    return apiClient.get(`${dashboardBase}/recent-orders`, { params });
  },
  getMessages(params) {
    return apiClient.get(`${dashboardBase}/messages`, { params });
  }
};
