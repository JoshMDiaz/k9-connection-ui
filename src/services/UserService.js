import axios from 'axios'
const CancelToken = axios.CancelToken

const base = '/k9-connect/api/v1/users',
  auth0UserObj = localStorage.getItem('auth0User')
    ? JSON.parse(localStorage.getItem('auth0User'))
    : {}

let getUserCancel, getUsersCancel, createUserCancel, updateUserCancel

class UserService {
  auth0User() {
    return auth0UserObj
  }

  get(params = {}, sub) {
    let url = `${base}/${auth0UserObj.sub || sub}`
    return axios
      .get(url, {
        params: params,
        headers: auth0UserObj,
        cancelToken: new CancelToken(function executor(c) {
          getUserCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelGet() {
    if (getUserCancel) {
      getUserCancel('Canceled get user request')
    }
  }

  getAll(params = {}) {
    let url = `${base}`
    return axios
      .get(url, {
        params: params,
        headers: auth0UserObj,
        cancelToken: new CancelToken(function executor(c) {
          getUsersCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelGetAll() {
    if (getUsersCancel) {
      getUsersCancel('Canceled get users request')
    }
  }

  createUser(body, params = {}) {
    let url = `${base}`
    return axios
      .post(url, body, {
        params: params,
        headers: auth0UserObj,
        cancelToken: new CancelToken(function executor(c) {
          createUserCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelCreateUser() {
    if (createUserCancel) {
      createUserCancel('Canceled create user request')
    }
  }

  updateUser(userId, body, params = {}) {
    let url = `${base}/${userId}`
    return axios
      .put(url, body, {
        params: params,
        headers: auth0UserObj,
        cancelToken: new CancelToken(function executor(c) {
          updateUserCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelUpdateUser() {
    if (updateUserCancel) {
      updateUserCancel('Canceled update user request')
    }
  }
}

export default new UserService()
