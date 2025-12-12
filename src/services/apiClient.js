import axios from "axios";
import { getAccessToken, updateAccessToken, clearTokens } from "./tokenStorage";


// ===========================================
// API CLIENT
// ===========================================
const apiClient = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api" // backend port 3002
      : "http://localhost:3000/api",
  withCredentials: true,
});

// ===========================================
// REQUEST: Attach Access Token
// ===========================================
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ===========================================
// REFRESH TOKEN LOGIC
// ===========================================
let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
}

// ===========================================
// RESPONSE INTERCEPTOR
// ===========================================
apiClient.interceptors.response.use(
  (res) => res.data, // all responses return res.data
  async (error) => {
    const original = error.config;

    // ======= 401 => Token Expired, Try Refresh =======
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      // Queue waiting requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return apiClient(original);
        });
      }

      isRefreshing = true;

      try {
        // Since (res) => res.data , response = {accessToken, ...}
        const res = await apiClient.post("/auth/refresh");

        const newAccess = res.accessToken; // NOT res.data.accessToken

        updateAccessToken(newAccess);
        processQueue(null, newAccess);

        original.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(original);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // ======= Normal Error =======
    return Promise.reject(error);
  }
);
console.log("API CLIENT LOADED FROM: services/apiClient.js");
export default apiClient;

