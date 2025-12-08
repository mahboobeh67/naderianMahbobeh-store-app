// import axios from "axios";
// import {
//   getAccessToken,
//   getRefreshToken,
//   updateAccessToken,
//   clearTokens,
//   saveTokens,
// } from "./tokenStorage";

// const apiClient = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: true,
// });

// // ---------------- REQUEST INTERCEPTOR ----------------
// apiClient.interceptors.request.use((config) => {
//   const token = getAccessToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// let isRefreshing = false;
// let failedQueue = [];

// function processQueue(error, token = null) {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// }

// // ---------------- RESPONSE INTERCEPTOR ----------------
// apiClient.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const refreshToken = getRefreshToken();
//       if (!refreshToken) {
//         clearTokens();
//         return Promise.reject(error);
//       }

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = "Bearer " + token;
//             return apiClient(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         const res = await axios.post(
//           "http://localhost:3000/auth/refresh",
//           {},
//           { withCredentials: true }
//         );

//         const newAccess = res.data.accessToken;
//         updateAccessToken(newAccess);
//         processQueue(null, newAccess);

//         originalRequest.headers.Authorization = "Bearer " + newAccess;
//         return apiClient(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         clearTokens();
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default apiClient;

