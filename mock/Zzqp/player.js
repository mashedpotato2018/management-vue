/* eslint-disable new-cap */
import Mock from 'mockjs'
import faceList from '../face/qilin.json'

let qinlin = []
faceList.forEach(item=>{
  qinlin.push(item.middleURL)
})


const count = 100

//基本信息
const List = []
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    UserId: '@increment',
    NickName: '@cname',
    "HeadImg|1": qinlin,
    Money: '@integer(60, 10000)',
    KingMoney: '@integer(60, 10000)',
    CardNum:'@integer(60, 100)',
    LastLoginTime: '@date("yyyy-MM-dd HH:mm:ss")',
    RegisterTime: '@date("yyyy-MM-dd HH:mm:ss")',
    "state|1-2": true
  }))
}
// 输赢统计
let statistics = []
List.forEach(item=>{
  statistics.push(Mock.mock({
    UserId: item.UserId,
    NickName: item.NickName,
    HeadImg: item.HeadImg,
    Money: item.Money,
    CardNum: item.CardNum,
    KingMoney: item.KingMoney,
    RegisterTime: item.RegisterTime,
    state: item.state,
    LastLoginTime: item.LastLoginTime,
    YesterdayMoney:'@integer(60, 10000)'
  }))
})
statistics.forEach(item=>{
  item.WeekMoney = item.YesterdayMoney * 7
  item.MonthMoney = item.YesterdayMoney * 30
})

// 输赢记录
let record = []
for (let i = 0; i < count; i++) {
  List.forEach(item=>{
    record.push(Mock.mock({
      UserId: item.UserId,
      NickName: item.NickName,
      TotalWinLose: '@integer(60, 10000)',
      startTime: '@date("yyyy-MM-dd HH:mm:ss")'
    }))
  })
}
let score = []
for (let i = 0; i < count; i++) {
  List.forEach(item=>{
    score.push(Mock.mock({
      UserId: item.UserId,
      NickName: item.NickName,
      Money: '@integer(60, 10000)',
      "Mark|1":[1,-1],
      startTime: '@date("yyyy-MM-dd HH:mm:ss")',
      proxyId:'@integer(60, 10000)',
      proxyNickName:'@cname'
    }))
  })
}

export default [
  {
    url: '/player/statistics',
    type: 'get',
    response: config => {
      const { keyword,state = true, page = 1, limit = 10 } = config.query
      const  boolType = { true:true, false: false }
      const mockList = statistics.filter(item => {
        if(!boolType[state]){
          if(item.state === true) return false
        }
        if (keyword && (item.UserId !== parseInt(keyword)&&item.NickName.indexOf(keyword) < 0)) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/player/record',
    type: 'get',
    response: config => {
      const { keyword, page = 1, limit = 10 } = config.query
      const mockList = record.filter(item => {
        if(!keyword) return false
        if (item.UserId !== parseInt(keyword)&&item.NickName.indexOf(keyword) < 0) return false
        return true
      })
      const basicList = List.filter(item => {
        if(!keyword) return false
        if (item.UserId !== parseInt(keyword)&&item.NickName.indexOf(keyword) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList,
          basic: basicList
        }
      }
    }
  },
  {
    url: '/player/score',
    type: 'get',
    response: config => {
      const { keyword, page = 1, limit = 10 } = config.query
      const mockList = score.filter(item => {
        if(!keyword) return false
        if (item.UserId !== parseInt(keyword)&&item.NickName.indexOf(keyword) < 0) return false
        return true
      })
      const basicList = List.filter(item => {
        if(!keyword) return false
        if (item.UserId !== parseInt(keyword)&&item.NickName.indexOf(keyword) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList,
          basic: basicList
        }
      }
    }
  },

  {
    url: '/player/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/player/banned',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/player/freeze',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/player/deblock',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
