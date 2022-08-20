import request from '@/utils/request'
export function getRouleList(params) {
  return request({
    url: '/sys/role',
    params // page 页码  pagesize 每页条数
  })
}
