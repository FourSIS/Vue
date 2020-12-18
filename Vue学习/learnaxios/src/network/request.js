import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://tianqiapi.com/api',
    timeout: 5000,
  })

  // 封装过程中，除了生成实例，返回实例对象以外，还要进行拦截器的设置
  // axios.interceptors.XXXX    // 使用axios的interceptor是全局的拦截
  instance.interceptors.response.use(data => {     // instance.interceptor是对应实例的拦截
    return data.data            // 拦截之后一定要把config对象在返回出去，否则组件中的catch会报错
  },err => {
    return Promise.reject(err)
  })



  return instance(config)
}