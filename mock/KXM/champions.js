import Mock from 'mockjs'
const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    account: '@id',
    password: '@string("lower", 5)',
    name: '@cname',
    phone: /^1[34578]\d{9}$/,
    idCard: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
    'sex|1': [0, 1],
    startTime: '@date("yyyy-MM-dd HH:mm:ss")',
    registerTime: '@date("yyyy-MM-dd HH:mm:ss")'
  }))
}

List.forEach(item => {
  item['endTime'] = new Date(item.startTime).getTime() + 3600 * 1000 * 24 * 30 * 5
})

List.sort((before, after) => new Date(before.ApplicationTime).getTime() - new Date(after.ApplicationTime).getTime()).reverse()
export default [
  {
    url: '/champions/list',
    type: 'get',
    response: config => {
      const { account, name, bTime, eTime, page = 1, limit = 10 } = config.query
      const mockList = List.filter(item => {
        if (account && item.account !== parseInt(account)) return false
        if (name && item.name.indexOf(name) < 0) return false
        if (bTime && new Date(item.registerTime).getTime() < new Date(bTime).getTime()) return false
        if (eTime && new Date(item.registerTime).getTime() > new Date(eTime).getTime()) return false
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
    url: '/champions/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
