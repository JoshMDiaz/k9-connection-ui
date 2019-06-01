import axios from 'axios'
const CancelToken = axios.CancelToken

const base = '/k9-connect/api/v1/users'

let getUserCancel, getUsersCancel

class UserService {
  get(sub, params = {}) {
    let url = `${base}/${sub}`
    return axios
      .get(url, {
        params: params,
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
}

export default new UserService()
