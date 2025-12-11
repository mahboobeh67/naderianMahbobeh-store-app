const ACCESS_KEY = "access_token";

// ----- GET -----
export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

// ----- SET -----
export function updateAccessToken(token) {
  localStorage.setItem(ACCESS_KEY, token);
}

// ----- REMOVE -----
export function removeTokens() {
  localStorage.removeItem(ACCESS_KEY);
}

// ----- Create unified object -----
export const authStorage = {
  getAccessToken,
  updateAccessToken,
  removeTokens,

  // Optional helper
  load() {
    return {
      token: getAccessToken(),
      // refreshToken: removed (cookie handles it!)
      user: null,
    };
  },
};
