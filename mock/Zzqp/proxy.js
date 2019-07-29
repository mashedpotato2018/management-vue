import Mock from 'mockjs'
import faceList from '../face/yan.json'

let yan = []
faceList.forEach(item=>{
  yan.push(item.middleURL)
})

const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    parentId: 0,
    id: '@increment',
    NickName: '@cname',
    "HeadImg|1": yan,
    Alliance: '@cname',
    SubPlayerTotal: '@integer(60, 100)',
    SubProxyTotal: '@integer(60, 100)',
    RegisterTime: '@date("yyyy-MM-dd HH:mm:ss")'
  }))
}
List.forEach(item=>{
  for(let i = 0; i<item.SubProxyTotal; i++){
    List.push(Mock.mock({
      parentId: item.id,
      id: '@increment',
      NickName: '@cname',
      "HeadImg|1": yan,
      Money: '@integer(60, 10000)',
      RegisterTime: '@date("yyyy-MM-dd HH:mm:ss")'
    }))
  }
})
let proxyList = []
List.forEach(item=>{
  proxyList.push(Mock.mock({
    UserId: '@increment',
    NickName: '@cname',
    Money: '@integer(60, 10000)',
    RegisterTime: item.RegisterTime,
    YesterdayMoney:'@integer(60, 10000)'
  }))
})
proxyList.forEach(item=>{
  item.WeekMoney = item.YesterdayMoney * 7
  item.MonthMoney = item.YesterdayMoney * 30
})


// 调配记录
let record = []
for (let i = 0; i < count; i++) {
  List.forEach(item=>{
    record.push(Mock.mock({
      id: item.id,
      NickName: item.NickName,
      DeployId:'@increment',
      DeployNickName: '@cname',
      "Mark|1":[1,-1],
      Money: '@integer(60, 10000)',
      Time: '@date("yyyy-MM-dd HH:mm:ss")'
    }))
  })
}

export default [
  {
    url: '/proxy/list',
    type: 'get',
    response: config => {
      const { keyword, parentId = 0, page = 1, limit = 10 } = config.query
      const mockList = List.filter(item => {
        if (keyword && (item.UserId !== parseInt(keyword)&&item.NickName.indexOf(keyword) < 0)) return false
        return item.parentId === parseInt(parentId)
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
    url: '/proxy/RefereeList',
    type: 'get',
    response: config => {
      const { keyword, parentId = 0, page = 1, limit = 10 } = config.query
      const mockList = List.filter(item => {
        if (keyword && (item.UserId !== parseInt(keyword)&&item.NickName.indexOf(keyword) < 0)) return false
        return item.parentId === parseInt(parentId)
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
    url: '/proxy/PlayerList',
    type: 'get',
    response: config => {
      const { keyword, parentId = 0, page = 1, limit = 10 } = config.query
      const mockList = List.filter(item => {
        if (keyword && (item.UserId !== parseInt(keyword)&&item.NickName.indexOf(keyword) < 0)) return false
        return item.parentId === parseInt(parentId)
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
    url: '/proxy/playerYield',
    type: 'get',
    response: config => {
      const { keyword, page = 1, limit = 10 } = config.query
      const mockList = proxyList.filter(item => {
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
    url: '/proxy/proxyYield',
    type: 'get',
    response: config => {
      const { keyword, page = 1, limit = 10 } = config.query
      const mockList = proxyList.filter(item => {
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
    url: '/proxy/record',
    type: 'get',
    response: config => {
      const { keyword, page = 1, limit = 10 } = config.query
      const mockList = record.filter(item => {
        if(!keyword) return false
        if (item.id !== parseInt(keyword)&&item.NickName.indexOf(keyword) < 0) return false
        return true
      })
      const basicList = List.filter(item => {
        if(!keyword) return false
        if (item.id !== parseInt(keyword)&&item.NickName.indexOf(keyword) < 0) return false
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
  }
]
