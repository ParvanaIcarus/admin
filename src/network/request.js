import axios from 'axios'
export const request = (options) => {
  // console.log(options)
  const inst = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000,
  })
  inst.interceptors.request.use((config) => {
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
  })
  inst.interceptors.response.use((res) => {
    return res.data
  })
  return inst(options)
}
