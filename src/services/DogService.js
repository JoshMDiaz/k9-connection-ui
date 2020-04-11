import SecureAxios from './SecureAxios'
import axios from 'axios'
import UserService from './UserService'
import { Cache } from 'axios-extensions'

const CancelToken = axios.CancelToken,
  DogCache = new Cache(),
  base = '/k9-connect/api/v1/dogs'

let dogCancel, dogsCancel, createDogCancel, updateDogCancel

class DogService {
  get(dogId, params = {}) {
    let url = `${base}/${dogId}`
    return SecureAxios.get(url, {
      params: params,
      headers: UserService.auth0User(),
      cancelToken: new CancelToken(function executor(c) {
        dogCancel = c
      }),
      cache: DogCache,
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {})
  }

  cancelGet() {
    if (dogCancel) {
      dogCancel('Canceled dog request')
    }
  }

  getAll(params = {}) {
    let url = `${base}`
    return SecureAxios.get(url, {
      params: params,
      headers: UserService.auth0User(),
      cancelToken: new CancelToken(function executor(c) {
        dogsCancel = c
      }),
      cache: DogCache,
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {})
  }

  cancelGetAll() {
    if (dogsCancel) {
      dogsCancel('Canceled dogs request')
    }
  }

  createDog(body, params = {}) {
    let url = `${base}`
    return SecureAxios.post(url, body, {
      params: params,
      headers: UserService.auth0User(),
      cancelToken: new CancelToken(function executor(c) {
        createDogCancel = c
      }),
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {})
  }

  cancelCreateDog() {
    if (createDogCancel) {
      createDogCancel('Canceled create dog request')
    }
  }

  updateDog(dogId, body, params = {}) {
    let url = `${base}/${dogId}`
    return SecureAxios.put(url, body, {
      params: params,
      headers: UserService.auth0User(),
      cancelToken: new CancelToken(function executor(c) {
        updateDogCancel = c
      }),
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {})
  }

  cancelUpdateDog() {
    if (updateDogCancel) {
      updateDogCancel('Canceled update dog request')
    }
  }

  clearCache() {
    DogCache.reset()
  }
}

export default new DogService()
