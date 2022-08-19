import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const timeOut = 3600
function logout() {
  return (Date.now() - store.getters.hrsaasTime) / 1000 > timeOut
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})
// 请求拦截器
service.interceptors.request.use(
  service.interceptors.request.use(config => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      if (logout()) { // 当token超时的时候，发送请求就让他清空信息，去重新登入
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token超时'))
      }
      // 如果token存在 注入token
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  }, error => {
    return Promise.reject(error)
  })
)
// 相应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response)
    const { data, success, message } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    Message.error(error.message)
    return Promise.reject(error)
  })
export default service
