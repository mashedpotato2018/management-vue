import request from '@/utils/request'

// 待处理提现
export function pendingList(data) {
  return request({
    url: '/withdrawal/pending',
    method: 'get',
    params: data
  })
}

// 处理方法
export function UpdateWithdrawal(data) {
  return request({
    url: '/withdrawal/update',
    method: 'post',
    data
  })
}

// 提现记录
export function RecordList(data) {
  return request({
    url: '/withdrawal/Record',
    method: 'get',
    params: data
  })
}
