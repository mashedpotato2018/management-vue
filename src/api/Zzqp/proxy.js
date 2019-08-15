import request from '@/utils/request'
// 代理列表
export function fetchList(data) {
  return request({
    url: '/proxy/list',
    method: 'get',
    params: data
  })
}
// 代理推荐人
export function RefereeList(data) {
  return request({
    url: '/proxy/RefereeList',
    method: 'get',
    params: data
  })
}
// 所属玩家列表
export function PlayerList(data) {
  return request({
    url: '/proxy/PlayerList',
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

// 调配记录
export function deploy(data) {
  return request({
    url: '/proxy/deploy',
    method: 'get',
    params: data
  })
}

// 房卡充值
export function CardNumRecord(data) {
  return request({
    url: '/proxy/CardNumRecord',
    method: 'get',
    params: data
  })
}

// 转换副盟主
export function ChangeAlliance(data) {
  return request({
    url: '/proxy/ChangeAlliance',
    method: 'post',
    data
  })
}

