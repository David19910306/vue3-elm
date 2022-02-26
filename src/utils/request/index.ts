import axios, { AxiosInstance } from 'axios'

const service: AxiosInstance = axios.create({
  withCredentials: true, // 是否为跨域请求
  timeout: 5000
})

// 请求的拦截
service.interceptors.request.use(config => {
  // 一般设置请求的头或者是token
  return config
}, error => {
  return error
})

// 响应的拦截
service.interceptors.response.use(response => {
  // 判断返回的状态码，是200就return
  return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
}, error => {
  return error
})

export default service
