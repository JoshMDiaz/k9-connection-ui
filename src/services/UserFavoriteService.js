import axios from 'axios'
import UserService from './UserService'
const CancelToken = axios.CancelToken

const base = '/k9-connect/api/v1/user_favorites'

let makeFavoriteCancel, removeFavoriteCancel

class UserFavoriteService {
  makeFavorite(body, params = {}) {
    let url = `${base}`
    return axios
      .post(url, body, {
        params: params,
        headers: UserService.auth0User(),
        cancelToken: new CancelToken(function executor(c) {
          makeFavoriteCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelMakeFavorite() {
    if (makeFavoriteCancel) {
      makeFavoriteCancel('Canceled make favorite request')
    }
  }

  removeFavorite(params = {}) {
    let url = `${base}/remove_favorite`
    return axios
      .delete(url, {
        params: params,
        headers: UserService.auth0User(),
        cancelToken: new CancelToken(function executor(c) {
          removeFavoriteCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelRemoveFavorite() {
    if (removeFavoriteCancel) {
      removeFavoriteCancel('Canceled remove favorite request')
    }
  }
}

export default new UserFavoriteService()
