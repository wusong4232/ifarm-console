import Cookies from 'js-cookie'

const LoginKey = 'Authorization'

export function getToken() {
  return Cookies.get(LoginKey);
}

export function setToken(token) {
  return Cookies.set(LoginKey, token)
}

export function removeToken() {
  return Cookies.remove(LoginKey)
}
