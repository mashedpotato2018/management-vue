import request from '@/utils/request'
// 盟主列表
export function fetchList(data) {
  return request({
    url: '/alliance/list',
    method: 'get',
    params: data
  })
}
// 玩家贡献
export function playerYield(data) {
  return request({
    url: '/alliance/playerYield',
    method: 'get',
    params: data
  })
}
// 代理贡献
export function proxyYield(data) {
  return request({
    url: '/alliance/proxyYield',
    method: 'get',
    params: data
  })
}
// 开通代理列表
export function openList(data) {
  return request({
    url: '/alliance/open',
    method: 'get',
    params: data
  })
}
