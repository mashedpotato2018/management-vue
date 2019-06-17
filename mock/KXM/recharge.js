import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    NickName: '@cname',
    RechargeMoney: '@integer(100, 1000)',
    RechargeTime: '@date("yyyy-MM-dd HH:mm:ss")'
  }))
}
export default [
  {
    url: '/recharge/list',
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
  }
]
