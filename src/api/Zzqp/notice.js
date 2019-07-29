import request from '@/utils/request'

// 跑马灯列表
export function LampList(data) {
  return request({
    url: '/Notice/LampList',
    method: 'get',
    params: data
  })
}

// 删除
export function DelLamp(data) {
  return request({
    url: '/Notice/DelLamp',
    method: 'post',
    data
  })
}

// 编辑
export function EditLamp(data) {
  return request({
    url: '/Notice/EditLamp',
    method: 'post',
    data
  })
}

// 添加
export function AddLamp(data) {
  return request({
    url: '/Notice/AddLamp',
    method: 'post',
    data
  })
}
