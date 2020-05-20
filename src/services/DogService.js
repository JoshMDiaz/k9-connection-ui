import SecureAxios from './SecureAxios'
import axios from 'axios'
import { auth0User } from './UserService'
import { Cache } from 'axios-extensions'

const CancelToken = axios.CancelToken,
  DogCache = new Cache(),
  base = '/k9-connect/api/v1/dogs'

let dogCancel, dogsCancel, createDogCancel, updateDogCancel

export function getDog(dogId, params = {}) {
  let url = `${base}/${dogId}`
  return SecureAxios.get(url, {
    params: params,
    headers: auth0User(),
    cancelToken: new CancelToken(function executor(c) {
      dogCancel = c
    }),
    cache: DogCache,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelGetDog() {
  if (dogCancel) {
    dogCancel('Canceled dog request')
  }
}

export function getAllDogs(params = {}) {
  let url = `${base}`
  return SecureAxios.get(url, {
    params: params,
    headers: auth0User(),
    cancelToken: new CancelToken(function executor(c) {
      dogsCancel = c
    }),
    cache: DogCache,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelGetAllDogs() {
  if (dogsCancel) {
    dogsCancel('Canceled dogs request')
  }
}

export function createDog(body, params = {}) {
  let url = `${base}`
  return SecureAxios.post(url, body, {
    params: params,
    headers: auth0User(),
    cancelToken: new CancelToken(function executor(c) {
      createDogCancel = c
    }),
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelCreateDog() {
  if (createDogCancel) {
    createDogCancel('Canceled create dog request')
  }
}

export function updateDog(dogId, body, params = {}) {
  let url = `${base}/${dogId}`
  return SecureAxios.put(url, body, {
    params: params,
    headers: auth0User(),
    cancelToken: new CancelToken(function executor(c) {
      updateDogCancel = c
    }),
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelUpdateDog() {
  if (updateDogCancel) {
    updateDogCancel('Canceled update dog request')
  }
}

export function clearDogCache() {
  DogCache.reset()
}
