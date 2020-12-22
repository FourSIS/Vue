import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL: "https://v0.yiketianqi.com/api", // 接口地址
    baseURL: "http://localhost:10086/weather.api",  // 自己后端的地址
    timeout: 5000,
    
  })

  instance.interceptors.response.use(response => {
    return response.data
  },err => {
    return Promise.reject(err)
  })

  return instance(config)
}