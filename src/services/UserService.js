import SecureAxios from './SecureAxios'
import axios from 'axios'
import { Cache } from 'axios-extensions'

const base = '/k9-connect/api/v1/users',
  auth0UserObj = localStorage.getItem('auth0User')
    ? JSON.parse(localStorage.getItem('auth0User'))
    : {},
  CancelToken = axios.CancelToken,
  UserCache = new Cache()

let getUserCancel, getUsersCancel, createUserCancel, updateUserCancel

export function auth0User() {
  return auth0UserObj
}

export function getUser(params = {}, sub) {
  let url = `${base}/${auth0UserObj.sub || sub}`
  return SecureAxios.get(url, {
    params: params,
    headers: auth0UserObj,
    cancelToken: new CancelToken(function executor(c) {
      getUserCancel = c
    }),
    cache: UserCache,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelGetUser() {
  if (getUserCancel) {
    getUserCancel('Canceled get user request')
  }
}

export function getAllUsers(params = {}) {
  let url = `${base}`
  return SecureAxios.get(url, {
    params: params,
    headers: auth0UserObj,
    cancelToken: new CancelToken(function executor(c) {
      getUsersCancel = c
    }),
    cache: UserCache,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelGetAllUsers() {
  if (getUsersCancel) {
    getUsersCancel('Canceled get users request')
  }
}

export function createUser(body, params = {}) {
  let url = `${base}`
  return SecureAxios.post(url, body, {
    params: params,
    headers: auth0UserObj,
    cancelToken: new CancelToken(function executor(c) {
      createUserCancel = c
    }),
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelCreateUser() {
  if (createUserCancel) {
    createUserCancel('Canceled create user request')
  }
}

export function updateUser(userId, body, params = {}) {
  let url = `${base}/${userId}`
  return SecureAxios.put(url, body, {
    params: params,
    headers: auth0UserObj,
    cancelToken: new CancelToken(function executor(c) {
      updateUserCancel = c
    }),
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelUpdateUser() {
  if (updateUserCancel) {
    updateUserCancel('Canceled update user request')
  }
}

export function clearUserCache() {
  UserCache.reset()
}
