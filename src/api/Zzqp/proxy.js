import request from '@/utils/request'
// 代理列表
export function fetchList(data) {
  return request({
    url: '/proxy/list',
    method: 'get',
    params: data
  })
}
// 玩家贡献
export function playerYield(data) {
  return request({
    url: '/proxy/playerYield',
    method: 'get',
    params: data
  })
}
// 代理贡献
export function proxyYield(data) {
  return request({
    url: '/proxy/proxyYield',
    method: 'get',
    params: data
  })
}
// 代理输赢记录
export function record(data) {
  return request({
    url: '/proxy/record',
    method: 'get',
    params: data
  })
}
