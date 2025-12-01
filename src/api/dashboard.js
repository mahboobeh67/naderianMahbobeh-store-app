// src/api/dashboard.js

const BASE_URL = "http://localhost:3000";

export async function fetchStats() {
  const res = await fetch(`${BASE_URL}/dashboard/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function fetchRecentOrders({ page = 1 } = {}) {
  const res = await fetch(`${BASE_URL}/dashboard/orders?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function fetchMessages() {
  const res = await fetch(`${BASE_URL}/dashboard/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function fetchSalesChart() {
  const res = await fetch(`${BASE_URL}/dashboard/chart`);
  if (!res.ok) throw new Error("Failed to fetch chart data");
  return res.json();
}
