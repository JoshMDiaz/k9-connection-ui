import SecureAxios from './SecureAxios'
import axios from 'axios'
import { auth0User } from './UserService'
import { Cache } from 'axios-extensions'

const base = '/k9-connect/api/v1/search',
  CancelToken = axios.CancelToken,
  SearchCache = new Cache()

let searchCancel

export function getSearchAll(params = {}) {
  let url = `${base}`
  return SecureAxios.get(url, {
    params: params,
    headers: auth0User(),
    cancelToken: new CancelToken(function executor(c) {
      searchCancel = c
    }),
    cache: SearchCache,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelGetSearchAll() {
  if (searchCancel) {
    searchCancel('Canceled search request')
  }
}

export function clearSearchCache() {
  SearchCache.reset()
}
