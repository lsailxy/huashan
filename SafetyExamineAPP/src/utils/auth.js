export default class Auth {
  static getToken() {
    return localStorage.getItem('token')
  }

  static setToken(token) {
    return localStorage.setItem('token', token)
  }

  static removeToken() {
    return localStorage.removeItem('token')
  }

  static getUsername() {
    return localStorage.getItem('username')
  }

  static setUsername(username) {
    return localStorage.setItem('username', username)
  }
}
