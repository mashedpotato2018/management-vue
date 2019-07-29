import request from '@/utils/request'

// 盟主列表
export function fetchList(data) {
  return request({
    url: '/champions/list',
    method: 'get',
    params: data
  })
}

// 修改盟主
export function Setchampions(data) {
  return request({
    url: '/champions/SetChampions',
    method: 'post',
    data
  })
}

// 修改盟主
export function ChangePwd(data) {
  return request({
    url: '/champions/ChangePwd',
    method: 'post',
    data
  })
}
