import SecureAxios from './SecureAxios'
import axios from 'axios'
import UserService from './UserService'
import { Cache } from 'axios-extensions'

const base = '/k9-connect/api/v1/search',
  CancelToken = axios.CancelToken,
  SearchCache = new Cache()

let searchCancel

class SearchService {
  getAll(params = {}) {
    let url = `${base}`
    return SecureAxios.get(url, {
      params: params,
      headers: UserService.auth0User(),
      cancelToken: new CancelToken(function executor(c) {
        searchCancel = c
      }),
      cache: SearchCache,
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {})
  }

  cancelGetAll() {
    if (searchCancel) {
      searchCancel('Canceled search request')
    }
  }

  clearCache() {
    SearchCache.reset()
  }
}

export default new SearchService()
