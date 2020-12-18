import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: "https://v0.yiketianqi.com/api",
    timeout: 5000,
    
  })

  instance.interceptors.response.use(response => {
    return response.data
  },err => {
    return Promise.reject(err)
  })

  return instance(config)
}