// ----------------------------------------
// In-Memory Storage
// ----------------------------------------
let inMemoryTokens = {
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
};

// ----------------------------------------
function loadFromLocalStorage() {
  try {
    const stored = JSON.parse(localStorage.getItem("auth-tokens"));
    if (stored) {
      inMemoryTokens = stored;
    }
  } catch (_) {}
}
loadFromLocalStorage();

// ----------------------------------------
export function saveTokens(accessToken, refreshToken, expiresAt) {
  inMemoryTokens = { accessToken, refreshToken, expiresAt };
  localStorage.setItem("auth-tokens", JSON.stringify(inMemoryTokens));
}

export function getTokens() {
  return inMemoryTokens;
}

export function updateAccessToken(newAccessToken) {
  inMemoryTokens.accessToken = newAccessToken;
  localStorage.setItem("auth-tokens", JSON.stringify(inMemoryTokens));
}

// ----------------------------------------
// این تابع استاندارد و رسمی logout است
// ----------------------------------------
export function clearTokens() {
  inMemoryTokens = {
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
  };
  localStorage.removeItem("auth-tokens");
}

// ----------------------------------------
export function getAccessToken() {
  return inMemoryTokens.accessToken;
}
export function getRefreshToken() {
  return inMemoryTokens.refreshToken;
}
export function getExpiresAt() {
  return inMemoryTokens.expiresAt;
}


