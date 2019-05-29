import Mock from 'mockjs'

const List = []
for (let i = 0; i < 50; i++) {
  List.push(Mock.mock({
    parentId: 0,
    id: '@increment',
    NickName: '@cname',
    SubPlayerTotal: '@integer(60, 100)',
    WinningLosingTotal: '@integer(600, 1000)',
    profitTotal: '@integer(300, 500)',
    ProvideProfits: '@integer(300, 500)'
  }))
}

List.push(Mock.mock({
  parentId: List[0].id,
  id: '@increment',
  NickName: '@cname',
  SubPlayerTotal: '@integer(60, 100)',
  WinningLosingTotal: '@integer(600, 1000)',
  profitTotal: '@integer(300, 500)',
  ProvideProfits: '@integer(300, 500)'
}))

List.forEach(lst => {
  List.forEach(item => {
    lst['hasChildren'] = (item.parentId === lst.id)
  })
})
export default [
  {
    url: '/proxy/list',
    type: 'get',
    response: config => {
      const { NickName, id, parentId = 0, page = 1, limit = 10 } = config.query
      const mockList = List.filter(item => {
        if (id && item.id !== parseInt(id)) return false
        if (NickName && item.NickName.indexOf(NickName) < 0) return false
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
  }
]
