import request from '@/utils/request'
// 每日注册
export function GetRegister(data) {
  return request({
    url: '/Statistics/GetRegister',
    method: 'get',
    params: data
  })
}

// 每日登录
export function GetLogon(data) {
  return request({
    url: '/Statistics/GetLogon',
    method: 'get',
    params: data
  })
}

// 每日房间对局
export function GetRoom(data) {
  return request({
    url: '/Statistics/GetRoom',
    method: 'get',
    params: data
  })
}

// 每日房卡消耗
export function GetCard(data) {
  return request({
    url: '/Statistics/GetCard',
    method: 'get',
    params: data
  })
}

// 每日盟主收益
export function GetAlliancePureProfit(data) {
  return request({
    url: '/Statistics/GetAlliancePureProfit',
    method: 'get',
    params: data
  })
}

// 每日代理收益
export function GetAgentProfit(data) {
  return request({
    url: '/Statistics/GetAgentProfit',
    method: 'get',
    params: data
  })
}

// 每日代理推荐人收益
export function GetAgentRefereeProfit(data) {
  return request({
    url: '/Statistics/GetAgentRefereeProfit',
    method: 'get',
    params: data
  })
}

// 每日新增代理
export function GetAddAgent(data) {
  return request({
    url: '/Statistics/GetAddAgent',
    method: 'get',
    params: data
  })
}

// 每日充值
export function GetRecharge(data) {
  return request({
    url: '/Statistics/GetRecharge',
    method: 'get',
    params: data
  })
}

// 每日联盟总珍珠
export function AllScore(data) {
  return request({
    url: '/Statistics/AllScore',
    method: 'get',
    params: data
  })
}

// 实时在线
export function OnLineWater(data) {
  return request({
    url: '/Statistics/OnLineWater',
    method: 'get',
    params: data
  })
}

// 每日奖池总计
export function GetJackpot(data) {
  return request({
    url: '/Statistics/GetJackpot',
    method: 'get',
    params: data
  })
}
