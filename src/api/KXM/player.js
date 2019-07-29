import request from '@/utils/request'
// 玩家列表
export function fetchList(data) {
  return request({
    url: '/player/list',
    method: 'get',
    params: data
  })
}

// 封禁用户
export function banned(data) {
  return request({
    url: '/player/banned',
    method: 'post',
    data
  })
}

// 战绩查询
export function combatQuery(data) {
  return request({
    url: '/player/combatQuery',
    method: 'get',
    params: data
  })
}

// 金币变化查询
export function changeQuery(data) {
  return request({
    url: '/player/changeQuery',
    method: 'get',
    params: data
  })
}

// 大厅流水
export function HallWater(data) {
  return request({
    url: '/player/HallWater',
    method: 'get',
    params: data
  })
}

// 实时在线人数
export function OnLineWater(data) {
  return request({
    url: '/player/OnLineWater',
    method: 'get',
    params: data
  })
}

// 玩家赠送记录
export function GivingRecords(data) {
  return request({
    url: '/player/GivingRecords',
    method: 'get',
    params: data
  })
}
// 玩家输赢榜
export function PlayersCrunchies(data) {
  return request({
    url: '/player/PlayersCrunchies',
    method: 'get',
    params: data
  })
}
