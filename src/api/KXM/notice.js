import request from '@/utils/request'

// 公告信息
export function fetchData(data) {
  return request({
    url: '/Record/GetNotice',
    method: 'get',
    params: data
  })
}

// 设置公告
export function set(data) {
  return request({
    url: '/Record/setNotice',
    method: 'post',
    data
  })
}

// 设置走马灯公告
export function HorseLamp(data) {
  return request({
    url: '/Record/HorseLamp',
    method: 'post',
    data
  })
}
