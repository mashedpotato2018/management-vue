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

// 获取奖池
export function JackpotList(data) {
  return request({
    url: '/withdrawal/JackpotList',
    method: 'get',
    params: data
  })
}

// 奖池设置
export function SetJackpot(data) {
  return request({
    url: '/withdrawal/SetJackpot',
    method: 'post',
    data
  })
}
