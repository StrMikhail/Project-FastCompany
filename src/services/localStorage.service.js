const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jet-refresh-token";
const EXPIRESS_KEY = "jet-expires-token";

export function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRESS_KEY, expiresDate);
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY)
}
export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRESS_KEY)
}
const localStorageservice = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate
}

export default localStorageservice;