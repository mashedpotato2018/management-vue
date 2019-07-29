import Mock from 'mockjs'
import faceList from '../face/liangbing.json'

let liangbing = []
faceList.forEach(item=>{
  liangbing.push(item.middleURL)
})

const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    parentId: 0,
    id: '@increment',
    NickName: '@cname',
    "HeadImg|1": liangbing,
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
      "HeadImg|1": liangbing,
      Money: '@integer(60, 10000)',
      RegisterTime: '@date("yyyy-MM-dd HH:mm:ss")'
    }))
  }
})
let allianceList = []
List.forEach(item=>{
  for (let i=0;i<30;i++){
    allianceList.push(Mock.mock({
      UserId: '@increment',
      NickName: '@cname',
      Money: '@integer(60, 10000)',
      RegisterTime: item.RegisterTime,
      YesterdayMoney:'@integer(60, 10000)'
    }))
  }
})
allianceList.forEach(item=>{
  item.WeekMoney = item.YesterdayMoney * 7
  item.MonthMoney = item.YesterdayMoney * 30
})


let openList = []
List.forEach(item=>{
  openList.push(Mock.mock({
    parentId: item.id,
    id: '@increment',
    NickName: '@cname',
    Money: '@integer(60, 10000)',
    startTime: '@date("yyyy-MM-dd HH:mm:ss")',
  }))
})

export default [
  {
    url: '/alliance/list',
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
    url: '/alliance/playerYield',
    type: 'get',
    response: config => {
      const { keyword, page = 1, limit = 10 } = config.query
      const mockList = allianceList.filter(item => {
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
    url: '/alliance/proxyYield',
    type: 'get',
    response: config => {
      const { keyword, page = 1, limit = 10 } = config.query
      const mockList = allianceList.filter(item => {
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
    url: '/alliance/openList',
    type: 'get',
    response: config => {
      const { keyword, page = 1, limit = 10 } = config.query
      const mockList = openList.filter(item => {
        if(!keyword) return false
        if(item.parentId !== parseInt(keyword)) return false
        return true
      })
      const basicList = List.filter(item => {
        if(!keyword) return false
        if (item.id !== parseInt(keyword)) return false
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
