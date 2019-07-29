import request from '@/utils/request'
// 代理列表
export function fetchList(data) {
  return request({
    url: '/proxy/list',
    method: 'get',
    params: data
  })
}
// 绑定代理
export function SetProxy(data) {
  return request({
    url: '/proxy/Set',
    method: 'post',
    data
  })
}
