const userLogin = 'userLogin'
const localStorage = window.localStorage
export function getUser () {
  return JSON.parse(localStorage.getItem(userLogin))
}
export function setUser (data) {
  return localStorage.setItem(userLogin, JSON.stringify(data))
}
export function removeUser () {
  return localStorage.removeItem(userLogin)
}
