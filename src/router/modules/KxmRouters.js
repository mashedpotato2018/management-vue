import Layout from '@/layout'

const KxmRouters = [
  {
    path: '/',
    component: Layout,
    redirect: '/player',
    children: [
      {
        path: 'player',
        component: () => import('@/views/Kxm/player/index'),
        name: 'player',
        meta: { title: '玩家管理', icon: 'peoples', affix: true }
      }
    ]
  },
  {
    path: '/proxy',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/proxy/index'),
        name: 'proxy',
        meta: { title: '代理列表', icon: 'tree', affix: false }
      }
    ]
  },
  {
    path: '/combat',
    component: Layout,
    children: [
      {
        path: 'Query',
        component: () => import('@/views/Kxm/combat/index'),
        name: 'combat',
        meta: { title: '战绩查询', icon: 'search', affix: false }
      }
    ]
  },
  {
    path: '/Line',
    component: Layout,
    children: [
      {
        path: 'Chart',
        component: () => import('@/views/Kxm/HallWater/Line'),
        name: 'Chart',
        meta: { title: '大厅流水', icon: 'chart', affix: false }
      }
    ]
  },
  {
    path: '/GivingRecords',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/GivingRecords/index'),
        name: 'GivingRecords',
        meta: { title: '玩家赠送记录', icon: 'list', affix: false }
      }
    ]
  },
  {
    path: '/PlayersCrunchies',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/PlayersCrunchies/index'),
        name: 'PlayersCrunchies',
        meta: { title: '玩家输赢榜', icon: 'nested', affix: false }
      }
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/recharge/index'),
        name: 'recharge',
        meta: { title: '充值记录', icon: 'shopping', affix: false }
      }
    ]
  },
  {
    path: '/WithdrawalPending',
    component: Layout,
    children: [
      {
        path: 'Pending',
        component: () => import('@/views/Kxm/Withdrawal/Pending'),
        name: 'WithdrawalPending',
        meta: { title: '待处理提现', icon: 'guide', affix: false }
      }
    ]
  },
  {
    path: '/WithdrawalRecord',
    component: Layout,
    children: [
      {
        path: 'Record',
        component: () => import('@/views/Kxm/Withdrawal/Record'),
        name: 'WithdrawalRecord',
        meta: { title: '提现记录', icon: 'documentation', affix: false }
      }
    ]
  },
  {
    path: '/Champions',
    component: Layout,
    meta: { title: '盟主生成和管理', icon: 'dashboard', affix: false },
    name: 'Champions',
    redirect: '/Champions/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/Champions/list'),
        name: 'list',
        meta: { title: '盟主列表' }
      },
      {
        path: 'set',
        component: () => import('@/views/Kxm/Champions/set'),
        name: 'set',
        meta: { title: '盟主管理' }
      },
      {
        path: 'changePassword',
        component: () => import('@/views/Kxm/Champions/changePassword'),
        name: 'changePassword',
        meta: { title: '修改面密码' },
        hidden: true
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    children: [
      {
        path: 'notice',
        component: () => import('@/views/Kxm/notice/index'),
        name: 'notice',
        meta: { title: '公告配置', icon: 'documentation', affix: false }
      }
    ]
  },
]
export default KxmRouters
