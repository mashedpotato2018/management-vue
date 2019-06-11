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
export function Updatechampions(data) {
  return request({
    url: '/champions/update',
    method: 'post',
    data
  })
}
