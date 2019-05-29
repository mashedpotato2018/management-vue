import request from '@/utils/request'

// 充值记录
export function fetchList(data) {
  return request({
    url: '/recharge/list',
    method: 'get',
    params: data
  })
}
