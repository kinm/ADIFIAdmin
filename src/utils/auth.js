// import Cookies from 'js-cookie'

const TokenKey = 'nft_admin_token'

export function getToken() {
  return window.localStorage.getItem(TokenKey)
  // return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
  // return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
  // return Cookies.remove(TokenKey)
}
