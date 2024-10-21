import client from './utils/api-client'
import { jwtDecode } from "jwt-decode";
// pretend this is firebase, netlify, or auth0's code.
// you shouldn't have to implement something like this in your own app

const localStorageKey = '__auth_provider_token__'

async function getToken() {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's token. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse({ token }) {
  window.localStorage.setItem(localStorageKey, token)
  return jwtDecode(token)
}

function login({ username, password }) {
  return client('auth/login', { data: { username, password } }).then(handleUserResponse)
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

async function initalUserWithTokenInLocalStorage() {
  getToken().then(
    (token) => {
      if (token)
        return handleUserResponse({ token })
      else
        return null
    }
  )
}

export { getToken, login, logout, localStorageKey, initalUserWithTokenInLocalStorage }
