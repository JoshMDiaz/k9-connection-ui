import axios from 'axios'
const CancelToken = axios.CancelToken

const base = '/k9-connect/api/v1/search'

let searchCancel

class SearchService {
  getAll(params = {}) {
    let url = `${base}`
    return axios
      .get(url, {
        params: params,
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
