import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use()
// response interceptor
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
