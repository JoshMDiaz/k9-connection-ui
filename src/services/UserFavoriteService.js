import axios from 'axios'
import { auth0User } from './UserService'
const CancelToken = axios.CancelToken

const base = '/k9-connect/api/v1/user_favorites'

let makeFavoriteCancel, removeFavoriteCancel

export function makeFavorite(body, params = {}) {
  let url = `${base}`
  return axios
    .post(url, body, {
      params: params,
      headers: auth0User(),
      cancelToken: new CancelToken(function executor(c) {
        makeFavoriteCancel = c
      }),
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelMakeFavorite() {
  if (makeFavoriteCancel) {
    makeFavoriteCancel('Canceled make favorite request')
  }
}

export function removeFavorite(params = {}) {
  let url = `${base}/remove_favorite`
  return axios
    .delete(url, {
      params: params,
      headers: auth0User(),
      cancelToken: new CancelToken(function executor(c) {
        removeFavoriteCancel = c
      }),
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelRemoveFavorite() {
  if (removeFavoriteCancel) {
    removeFavoriteCancel('Canceled remove favorite request')
  }
}
