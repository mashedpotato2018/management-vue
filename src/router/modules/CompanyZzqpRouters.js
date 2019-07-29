import Layout from '@/layout'

const CompanyZzqpRouters = [
  {
    path: '/',
    component: Layout,
    meta: { title: '用户管理', icon: 'bug' },
    name:'account',
    redirect: '/account/update',
    children: [
      {
        path: '/account/update',
        component: () => import('@/views/ZZQP/manage/setUser'),
        name: 'update',
        meta: { title: '用户设置'}
      },
      {
        path: '/account/blacklist',
        component: () => import('@/views/ZZQP/manage/blackList'),
        name: 'blacklist',
        meta: { title: '黑名单'}
      }
    ]
  },
  {
    path: '/record',
    redirect: '/record/list',
    component: Layout,
    meta: { title: '记录查询', icon: 'search' },
    name:'record',
    children: [
      {
        path: 'list',
        component: () => import('@/views/ZZQP/player/record'),
        name: 'WinRecord',
        meta: { title: '玩家输赢记录'}
      }
    ]
  },
  {
    path: '/static',
    component: Layout,
    meta: { title: '统计', icon: 'chart' },
    name:'statistics',
    redirect: '/static/GetAddAgent',
    children: [
      {
        path: 'GetAddAgent',
        component: () => import('@/views/ZZQP/statistics/GetAddAgent'),
        name: 'GetAddAgent',
        meta: { title: '每日新增代理'}
      },
      {
        path: 'Register',
        component: () => import('@/views/ZZQP/statistics/Register'),
        name: 'Register',
        meta: { title: '每日注册'}
      },
      {
        path: 'logon',
        component: () => import('@/views/ZZQP/statistics/Logon'),
        name: 'logon',
        meta: { title: '每日登录'}
      },
      {
        path: 'room',
        component: () => import('@/views/ZZQP/statistics/Room'),
        name: 'room',
        meta: { title: '每日房间对局'}
      },
      {
        path: 'card',
        component: () => import('@/views/ZZQP/statistics/Card'),
        name: 'card',
        meta: { title: '每日房卡'}
      },
      {
        path: 'Alliance',
        component: () => import('@/views/ZZQP/statistics/Alliance'),
        name: 'Alliance',
        meta: { title: '每日盟主收益'}
      },
      {
        path: 'Agent',
        component: () => import('@/views/ZZQP/statistics/Agent'),
        name: 'Agent',
        meta: { title: '每日代理收益'}
      },
      {
        path: 'Referee',
        component: () => import('@/views/ZZQP/statistics/Referee'),
        name: 'Referee',
        meta: { title: '每日代理推荐人收益'}
      },
      {
        path: 'Recharge',
        component: () => import('@/views/ZZQP/statistics/Recharge'),
        name: 'Recharge',
        meta: { title: '每日充值'}
      },
      {
        path: 'AllScore',
        component: () => import('@/views/ZZQP/statistics/AllScore'),
        name: 'AllScore',
        meta: { title: '每日联盟总珍珠'}
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    meta: { title: '统计', icon: 'lamp' },
    redirect: '/notice/lamp',
    children:[
      {
        path: 'lamp',
        component: () => import('@/views/ZZQP/notice/lamp'),
        name: 'lamp',
        meta: { title: '跑马灯'}
      },
      {
        path: 'lampDetail',
        component: () => import('@/views/ZZQP/notice/lampDetail'),
        name: 'lampDetail',
        hidden: true
      }
    ]
  }
]
export default CompanyZzqpRouters
