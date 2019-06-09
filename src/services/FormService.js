import axios from 'axios'
import UserService from './UserService'
const CancelToken = axios.CancelToken

const base = '/k9-connect/api/v1'

let breedsCancel, statesCancel, eyeColorsCancel

class DogService {
  getBreeds(params = {}) {
    let url = `${base}/breeds`
    return axios
      .get(url, {
        params: params,
        headers: UserService.auth0User(),
        cancelToken: new CancelToken(function executor(c) {
          breedsCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelGetBreeds() {
    if (breedsCancel) {
      breedsCancel('Canceled breeds request')
    }
  }

  getStates(params = {}) {
    let url = `${base}/states`
    return axios
      .get(url, {
        params: params,
        headers: UserService.auth0User(),
        cancelToken: new CancelToken(function executor(c) {
          statesCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelGetStates() {
    if (statesCancel) {
      statesCancel('Canceled states request')
    }
  }

  getEyeColors(params = {}) {
    let url = `${base}/eye_colors`
    return axios
      .get(url, {
        params: params,
        headers: UserService.auth0User(),
        cancelToken: new CancelToken(function executor(c) {
          eyeColorsCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelGetEyeColors() {
    if (eyeColorsCancel) {
      eyeColorsCancel('Canceled eye colors request')
    }
  }
}

export default new DogService()
