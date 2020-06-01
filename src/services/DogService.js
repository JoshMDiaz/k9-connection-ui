import SecureAxios from './SecureAxios'
import axios from 'axios'
import { auth0User } from './UserService'
import { Cache } from 'axios-extensions'

const CancelToken = axios.CancelToken,
  DogCache = new Cache(),
  base = '/k9-connect/api/v1/dogs'

let dogCancel,
  dogsCancel,
  createDogCancel,
  updateDogCancel,
  updateDogCancelImages,
  createDogImagesCancel,
  deleteDogCancelImage

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

export function createDogImages(id, body, params = {}) {
  let url = `${base}/${id}/dog_images`
  return SecureAxios.post(url, body, {
    params: params,
    headers: auth0User(),
    cancelToken: new CancelToken(function executor(c) {
      createDogImagesCancel = c
    }),
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelCreateDogImages() {
  if (createDogImagesCancel) {
    createDogImagesCancel('Canceled create dog images request')
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

export function updateDogImage(dogId, body, params = {}) {
  let url = `/k9-connect/api/v1/dog_images/${dogId}`
  return SecureAxios.put(url, body, {
    params: params,
    headers: auth0User(),
    cancelToken: new CancelToken(function executor(c) {
      updateDogCancelImages = c
    }),
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelUpdateDogImage() {
  if (updateDogCancelImages) {
    updateDogCancelImages('Canceled update dog images request')
  }
}

export function deleteDogImage(dogId) {
  let url = `/k9-connect/api/v1/dog_images/${dogId}`
  return SecureAxios.delete(url, {
    headers: auth0User(),
    cancelToken: new CancelToken(function executor(c) {
      deleteDogCancelImage = c
    }),
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export function cancelDeleteDogImage() {
  if (deleteDogCancelImage) {
    deleteDogCancelImage('Canceled delete dog image request')
  }
}

export function clearDogCache() {
  DogCache.reset()
}
