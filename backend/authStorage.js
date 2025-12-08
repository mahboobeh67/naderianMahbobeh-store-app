const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

// ----- GET -----
export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

// ----- SET -----
export function updateAccessToken(token) {
  localStorage.setItem(ACCESS_KEY, token);
}

export function updateRefreshToken(token) {
  localStorage.setItem(REFRESH_KEY, token);
}

// ----- REMOVE -----
export function removeTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

// ----- Create unified object -----
export const authStorage = {
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  updateRefreshToken,
  removeTokens,

  // Optional helper
  load() {
    return {
      token: getAccessToken(),
      refreshToken: getRefreshToken(),
      user: null, // فعلا اگر دیتا داری اضافه کن
    };
  },
};
