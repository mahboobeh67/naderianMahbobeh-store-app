
let memoryTokens = {
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
};

export function saveTokens(accessToken, refreshToken, expiresAt) {
  memoryTokens = { accessToken, refreshToken, expiresAt };

  localStorage.setItem(
    "auth",
    JSON.stringify({ accessToken, refreshToken, expiresAt })
  );
}

export function loadTokens() {
  const stored = localStorage.getItem("auth");
  if (!stored) return null;

  const parsed = JSON.parse(stored);
  memoryTokens = parsed;
  return parsed;
}

export function clearTokens() {
  memoryTokens = { accessToken: null, refreshToken: null, expiresAt: null };
  localStorage.removeItem("auth");
}

export function getAccessToken() {
  return memoryTokens.accessToken;
}

export function getRefreshToken() {
  return memoryTokens.refreshToken;
}

export function updateAccessToken(newToken) {
  memoryTokens.accessToken = newToken;

  const stored = JSON.parse(localStorage.getItem("auth"));
  if (stored) {
    stored.accessToken = newToken;
    localStorage.setItem("auth", JSON.stringify(stored));
  }
}
