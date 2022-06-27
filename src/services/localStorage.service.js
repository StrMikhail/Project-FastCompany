const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jet-refresh-token";
const EXPIRESS_KEY = "jet-expires-token";
const USERID_KEY  = "user-local-id";
export function setTokens({ refreshToken, idToken, localId, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(USERID_KEY , localId);
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
export function getUserId() {
    return localStorage.getItem(USERID_KEY)
}
export function removeAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(EXPIRESS_KEY);

}
const localStorageservice = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData
}

export default localStorageservice;