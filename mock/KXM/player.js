/* eslint-disable new-cap */
import Mock from 'mockjs'

const List = []
const combatList = []
const HallWater = []
const GivingRecords = []
const PlayersCrunchies = []
const count = 100
const ImgUrl = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2476904515,3423877737&fm=27&gp=0.jpg'
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    NickName: '@cname',
    HeadImg: ImgUrl,
    Money: '@integer(60, 10000)',
    ProxyID: '@id',
    RegisterTime: '@date("yyyy-MM-dd HH:mm:ss")',
    LastLoginTime: '@date("yyyy-MM-dd HH:mm:ss")'
  }))
}

for (let i = 0; i < count; i++) {
  for (let j = 0; j < count; j++) {
    combatList.push(Mock.mock({
      id: List[i].id,
      NickName: List[i].NickName,
      HeadImg: ImgUrl,
      Money: '@integer(60, 10000)',
      startTime: '@date("yyyy-MM-dd HH:mm:ss")',
      TotalWinLose: '@integer(60, 200)',
      'GameName|1': [
        '斗地主',
        '龙虎斗',
        '抢庄牛牛',
        '捕鱼'
      ]
    }))
  }
}

for (let i = 0; i < count; i++) {
  HallWater.push(Mock.mock({
    Date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * i),
    'GameName|1': [
      '斗地主',
      '龙虎斗',
      '抢庄牛牛',
      '捕鱼'
    ],
    WinTotal: '@integer(60, 10000)'
  }))
}
HallWater.sort((before, after) => before.Date.getTime() - after.Date.getTime())

for (let i = 0; i < count; i++) {
  GivingRecords.push(Mock.mock({
    GivingID: '@increment',
    GivingNickName: '@cname',
    'Type|1': ['赠送', '被赠送'],
    ByGivingID: '@increment',
    ByGivingNickName: '@cname',
    BeforeMoney: '@integer(600, 10000)',
    ChangeMoney: '@integer(600, 1000)',
    ChangeTime: '@date("yyyy-MM-dd HH:mm:ss")'
  }))
}
GivingRecords.forEach(item => {
  item['AfterMoney'] = item.BeforeMoney + item.ChangeMoney
})

for (let i = 0; i < count; i++) {
  PlayersCrunchies.push(Mock.mock({
    id: '@increment',
    NickName: '@cname',
    WinMoney: '@integer(100, 1000)'
  }))
}
PlayersCrunchies.sort((big, small) => big.WinMoney - small.WinMoney).reverse()
PlayersCrunchies.forEach((item, index) => {
  item['ranking'] = index + 1
})
export default [
  {
    url: '/player/list',
    type: 'get',
    response: config => {
      const { NickName, id, page = 1, limit = 10 } = config.query
      const mockList = List.filter(item => {
        if (id && item.id !== parseInt(id)) return false
        if (NickName && item.NickName.indexOf(NickName) < 0) return false
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
    url: '/player/combatQuery',
    type: 'get',
    response: config => {
      const { NickName, id, page = 1, limit = 10 } = config.query
      let mockList = []
      if (id || NickName) {
        mockList = combatList.filter(item => {
          if (id && item.id !== parseInt(id)) return false
          if (NickName && item.NickName.indexOf(NickName) < 0) return false
          return true
        })
      }
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList,
          basic: [pageList[0]]||[]
        }
      }
    }
  },
  {
    url: '/player/HallWater',
    type: 'get',
    response: config => {
      // const { bTime, eTime, page = 1, limit = 10 } = config.query
      const { bTime, eTime } = config.query
      const mockList = HallWater.filter(item => {
        if (bTime) return item.Date.getTime() > new Date(bTime).getTime()
        if (eTime) return item.Date.getTime() > new Date(eTime).getTime()
        return true
      })

      // const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: mockList
        }
      }
    }
  },
  {
    url: '/player/GivingRecords',
    type: 'get',
    response: config => {
      const { NickName, id, page = 1, limit = 10 } = config.query
      let mockList = []
      mockList = GivingRecords.filter(item => {
        if (id && (item.GivingID !== parseInt(id) && item.ByGivingID !== parseInt(id))) return false
        if (NickName && (item.GivingNickName.indexOf(NickName) < 0 && item.ByGivingNickName.indexOf(NickName) < 0)) return false
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
    url: '/player/PlayersCrunchies',
    type: 'get',
    response: config => {
      const { NickName, id, sortType = 1, page = 1, limit = 10 } = config.query
      let mockList = []
      mockList = PlayersCrunchies.filter(item => {
        if (id && item.id !== parseInt(id)) return false
        if (NickName && item.NickName.indexOf(NickName) < 0) return false
        return true
      })
      if (parseInt(sortType) === 0) mockList.reverse()
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      PlayersCrunchies
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]
