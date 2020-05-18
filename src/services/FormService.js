import SecureAxios from './SecureAxios'
import axios from 'axios'
import UserService from './UserService'
import { Cache } from 'axios-extensions'

const base = '/k9-connect/api/v1',
  CancelToken = axios.CancelToken,
  FormCache = new Cache()

let breedsCancel, statesCancel, eyeColorsCancel

export function getBreeds(params = {}) {
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

export function cancelGetBreeds() {
  if (breedsCancel) {
    breedsCancel('Canceled breeds request')
  }
}

export function getStates(params = {}) {
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

export function cancelGetStates() {
  if (statesCancel) {
    statesCancel('Canceled states request')
  }
}

export function getEyeColors(params = {}) {
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

export function cancelGetEyeColors() {
  if (eyeColorsCancel) {
    eyeColorsCancel('Canceled eye colors request')
  }
}

export function clearCache() {
  FormCache.reset()
}
