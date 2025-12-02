import { ENV } from "./env";

export const API_CONFIG = {
  BASE_URL: ENV.BASE_URL,
  VERSION: "v1", // اگر نخواستی حذف کن
  ENDPOINTS: {
    PRODUCTS: "/products",
    CATEGORIES: "/categories",
    USERS: "/users",
  },
};

// URL Helper:
// BASE + /v1 + endpoint
export function apiUrl(path) {
  return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}${path}`;
}
