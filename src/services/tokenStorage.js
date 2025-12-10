// src/services/tokenStorage.js

let memoryAccessToken = null;

// ================================
// Save ONLY access token
// (refresh token is in HttpOnly cookie — not readable here)
// ================================
export function saveAccessToken(token) {
  memoryAccessToken = token;
  localStorage.setItem("accessToken", token);
}

// ================================
export function getAccessToken() {
  return memoryAccessToken;
}

// ================================
export function loadAccessToken() {
  const token = localStorage.getItem("accessToken");
  memoryAccessToken = token;
  return token;
}

// ================================
export function clearTokens() {
  memoryAccessToken = null;
  localStorage.removeItem("accessToken");
}

// ================================
export function updateAccessToken(newToken) {
  memoryAccessToken = newToken;
  localStorage.setItem("accessToken", newToken);
}
