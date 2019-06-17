import request from '@/utils/request'
// 输赢统计
export function statistics(data) {
  return request({
    url: '/player/statistics',
    method: 'get',
    params: data
  })
}
// 输赢记录
export function record(data) {
  return request({
    url: '/player/record',
    method: 'get',
    params: data
  })
}

// 上下分记录
export function score(data) {
  return request({
    url: '/player/score',
    method: 'get',
    params: data
  })
}

// 设置数据
export function update(data) {
  return request({
    url: '/player/update',
    method: 'post',
    data
  })
}

//封禁
export function banned(data) {
  return request({
    url: '/player/banned',
    method: 'post',
    data
  })
}

//冻结
export function freeze(data) {
  return request({
    url: '/player/freeze',
    method: 'post',
    data
  })
}

// 解封
export function deblock(data) {
  return request({
    url: '/player/deblock',
    method: 'post',
    data
  })
}

