import request from '@/utils/request'

// 合伙人列表
export function fetchList(data) {
  return request({
    url: '/Partner/PartnerList',
    method: 'get',
    params: data
  })
}

// 合伙人每周贡献列表
export function ContributeList(data) {
  return request({
    url: '/Partner/ContributeList',
    method: 'get',
    params: data
  })
}

// 每周贡献详情
export function ContributeDetail(data) {
  return request({
    url: '/Partner/ContributeDetail',
    method: 'get',
    params: data
  })
}
