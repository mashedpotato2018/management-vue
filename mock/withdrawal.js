import Mock from 'mockjs'
const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    NickName: '@cname',
    AppliedAmount: '@integer(100, 10000)',
    Material: '@cparagraph',
    ApplicationTime: '@date("yyyy-MM-dd HH:mm:ss")',
    state: 0
  }))
}

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    NickName: '@cname',
    AppliedAmount: '@integer(100, 10000)',
    Material: '@cparagraph',
    ApplicationTime: '@date("yyyy-MM-dd HH:mm:ss")',
    HandlingTime: '@date("yyyy-MM-dd HH:mm:ss")',
    'state|1': [1, 2]
  }))
}
List.forEach(item => {
  item['ActualAmount'] = (item.AppliedAmount * 98) / 100
})
let pendingList = []
let RecordList = []
pendingList = List.filter(item => item.state === 0)
RecordList = List.filter(item => item.state !== 0)

pendingList.sort((before, after) => new Date(before.ApplicationTime).getTime() - new Date(after.ApplicationTime).getTime()).reverse()
RecordList.sort((before, after) => new Date(before.ApplicationTime).getTime() - new Date(after.ApplicationTime).getTime()).reverse()
export default [
  {
    url: '/withdrawal/pending',
    type: 'get',
    response: config => {
      const { NickName, id, page = 1, limit = 10 } = config.query
      const mockList = pendingList.filter(item => {
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
    url: '/withdrawal/Record',
    type: 'get',
    response: config => {
      const { NickName, id, page = 1, limit = 10 } = config.query
      const mockList = RecordList.filter(item => {
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
    url: '/withdrawal/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
