import axios from 'axios'
import UserService from './UserService'
const CancelToken = axios.CancelToken

const base = '/k9-connect/api/v1/search'

let searchCancel

class SearchService {
  getAll(params = {}) {
    let url = `${base}`
    return axios
      .get(url, {
        params: params,
        headers: UserService.auth0User(),
        cancelToken: new CancelToken(function executor(c) {
          searchCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelGetAll() {
    if (searchCancel) {
      searchCancel('Canceled search request')
    }
  }
}

export default new SearchService()
