import client from './utils/api-client'
// pretend this is firebase, netlify, or auth0's code.
// you shouldn't have to implement something like this in your own app

const localStorageKey = '__auth_provider_token__'

async function getToken() {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's token. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse({ user }) {
  window.localStorage.setItem(localStorageKey, user.token)
  return user
}

function login({ username, password }) {
  return client('auth/login', { username, password }).then(handleUserResponse)
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

export { getToken, login, logout, localStorageKey }
