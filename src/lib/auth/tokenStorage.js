// ----------------------------------------
// In-Memory Storage (امن‌تر + سریع‌تر)
// ----------------------------------------
let inMemoryTokens = {
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
};

// ----------------------------------------
// Load tokens from localStorage when app loads
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
// 1) Save both tokens
// ----------------------------------------
export function saveTokens(accessToken, refreshToken, expiresAt) {
  inMemoryTokens = { accessToken, refreshToken, expiresAt };
  localStorage.setItem("auth-tokens", JSON.stringify(inMemoryTokens));
}

// ----------------------------------------
// 2) Get all tokens
// ----------------------------------------
export function getTokens() {
  return inMemoryTokens;
}

// ----------------------------------------
// 3) Update ONLY access token (after refresh)
// ----------------------------------------
export function updateAccessToken(newAccessToken) {
  inMemoryTokens.accessToken = newAccessToken;

  localStorage.setItem(
    "auth-tokens",
    JSON.stringify(inMemoryTokens)
  );
}

// ----------------------------------------
// 4) Remove tokens (logout)
// ----------------------------------------
export function removeTokens() {
  inMemoryTokens = {
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
  };
  localStorage.removeItem("auth-tokens");
}

// ----------------------------------------
// 5) Helpers
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
