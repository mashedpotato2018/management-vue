import request from '@/utils/request'
// 盟主列表
export function fetchList(data) {
  return request({
    url: '/alliance/list',
    method: 'get',
    params: data
  })
}
// 所属副盟主列表
export function allianceList(data) {
  return request({
    url: '/alliance/AllianceList',
    method: 'get',
    params: data
  })
}

// 所属代理列表
export function ProxyList(data) {
  return request({
    url: '/alliance/ProxyList',
    method: 'get',
    params: data
  })
}
// 所属玩家列表
export function PlayerList(data) {
  return request({
    url: '/alliance/PlayerList',
    method: 'get',
    params: data
  })
}
// 开通代理列表
export function openList(data) {
  return request({
    url: '/alliance/openList',
    method: 'get',
    params: data
  })
}
