import axios from 'axios'
const CancelToken = axios.CancelToken

const base = '/k9-connect/api/v1/dogs'

let dogCancel, dogsCancel, createDogCancel, updateDogCancel

class DogService {
  get(dogId, params = {}) {
    let url = `${base}/${dogId}`
    return axios
      .get(url, {
        params: params,
        cancelToken: new CancelToken(function executor(c) {
          dogCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelGet() {
    if (dogCancel) {
      dogCancel('Canceled dog request')
    }
  }

  getAll(params = {}) {
    let url = `${base}`
    return axios
      .get(url, {
        params: params,
        cancelToken: new CancelToken(function executor(c) {
          dogsCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelGetAll() {
    if (dogsCancel) {
      dogsCancel('Canceled dogs request')
    }
  }

  createDog(body, params = {}) {
    let url = `${base}`
    return axios
      .post(url, body, {
        params: params,
        cancelToken: new CancelToken(function executor(c) {
          createDogCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelCreateDog() {
    if (createDogCancel) {
      createDogCancel('Canceled create dog request')
    }
  }

  updateDog(dogId, body, params = {}) {
    let url = `${base}/${dogId}`
    return axios
      .put(url, body, {
        params: params,
        cancelToken: new CancelToken(function executor(c) {
          updateDogCancel = c
        })
      })
      .then(response => {
        return response.data
      })
      .catch(error => {})
  }

  cancelUpdateDog() {
    if (updateDogCancel) {
      updateDogCancel('Canceled update dog request')
    }
  }
}

export default new DogService()
