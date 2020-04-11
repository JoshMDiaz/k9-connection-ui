import SecureAxios from './SecureAxios'
import axios from 'axios'
import UserService from './UserService'
import { Cache } from 'axios-extensions'

const base = '/k9-connect/api/v1',
  CancelToken = axios.CancelToken,
  FormCache = new Cache()

let breedsCancel, statesCancel, eyeColorsCancel

class DogService {
  getBreeds(params = {}) {
    let url = `${base}/breeds`
    return SecureAxios.get(url, {
      params: params,
      headers: UserService.auth0User(),
      cancelToken: new CancelToken(function executor(c) {
        breedsCancel = c
      }),
      cache: FormCache,
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {})
  }

  cancelGetBreeds() {
    if (breedsCancel) {
      breedsCancel('Canceled breeds request')
    }
  }

  getStates(params = {}) {
    let url = `${base}/states`
    return SecureAxios.get(url, {
      params: params,
      headers: UserService.auth0User(),
      cancelToken: new CancelToken(function executor(c) {
        statesCancel = c
      }),
      cache: FormCache,
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {})
  }

  cancelGetStates() {
    if (statesCancel) {
      statesCancel('Canceled states request')
    }
  }

  getEyeColors(params = {}) {
    let url = `${base}/eye_colors`
    return SecureAxios.get(url, {
      params: params,
      headers: UserService.auth0User(),
      cancelToken: new CancelToken(function executor(c) {
        eyeColorsCancel = c
      }),
      cache: FormCache,
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {})
  }

  cancelGetEyeColors() {
    if (eyeColorsCancel) {
      eyeColorsCancel('Canceled eye colors request')
    }
  }

  clearCache() {
    FormCache.reset()
  }
}

export default new DogService()
