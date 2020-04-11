import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'
import qs from 'qs'
import Auth from './Auth/Auth'

const instance = axios.create({
  baseURL: '/',
  headers: {
    'Cache-Control': 'no-cache',
  },
  adapter: throttleAdapterEnhancer(
    cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false }),
    { threshold: 1 * 1000 }
  ),
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      arrayFormat: 'brackets',
      encodeValuesOnly: true,
    })
  },
})

// Do something with request header
instance.interceptors.request.use(
  function (config) {
    const auth = new Auth()
    let token = auth.getIdToken()
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

// Do something with response error
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      const auth = new Auth()
      if (auth.isAuthenticated()) {
        auth.logout() // TODO: Consider a more robust logout experience with redirect back in and messaging
      } else {
        auth.login()
      }
    } else if (error?.response && window.onerror) {
      const reportedError = new Error(
        `Received status ${error.response.status} from endpoint ${error.request.responseURL}`
      )
      reportedError.stack = error.stack
      window.onerror(
        `Status: ${error.response.status}. Endpoint: ${error.request.responseURL}`,
        '',
        '',
        '',
        reportedError
      )
    }
    return Promise.reject(error.response)
  }
)

export default instance
