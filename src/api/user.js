import request from '@/utils/request'

export function login(data) {
  return request({ url: '/sys/login', method: 'POST', data })
}
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
export function getDeltailInfo(id) {
  return request({ url: `/sys/user/${id}`, method: 'get' })
}
export function logout() {}
