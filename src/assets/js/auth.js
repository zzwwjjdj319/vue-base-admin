import Cookies from "js-cookie";

const TokenKey = "gisdata_token";
const IdKey = "gisdata_userid";
// userInfo
/**
 * token操作
 */
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, day) {
  if (day) return Cookies.set(TokenKey, token, { expires: day });
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

/**
 * UserId操作
 */
export function getUserIdInCookie() {
  return Cookies.get(IdKey);
}

export function setUserIdInCookie(token, day) {
  if (day) return Cookies.set(IdKey, token, { expires: day });
  return Cookies.set(IdKey, token);
}

export function removeUserId() {
  return Cookies.remove(IdKey);
}
