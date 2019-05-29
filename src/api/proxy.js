import request from '@/utils/request'
// 代理列表
export function fetchList(data) {
  return request({
    url: '/proxy/list',
    method: 'get',
    params: data
  })
}
