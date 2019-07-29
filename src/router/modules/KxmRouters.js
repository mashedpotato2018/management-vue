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
    path: '/change',
    component: Layout,
    children: [
      {
        path: 'Query',
        component: () => import('@/views/Kxm/change'),
        name: 'change',
        meta: { title: '变化金币查询', icon: 'change', affix: false }
      }
    ]
  },
  {
    path: '/Line',
    component: Layout,
    meta: { title: '图表统计', icon: 'chart', affix: false },
    children: [
      {
        path: 'EarningsChart',
        component: () => import('@/views/Kxm/PlatformEarnings/Line'),
        name: 'EarningsChart',
        meta: { title: '平台收益', affix: false }
      },
      {
        path: 'WaterChart',
        component: () => import('@/views/Kxm/HallWater'),
        name: 'WaterChart',
        meta: { title: '大厅流水', affix: false }
      },
      {
        path: 'RechargeWater',
        component: () => import('@/views/Kxm/RechargeWater'),
        name: 'RechargeWater',
        meta: { title: '充值流水', affix: false }
      },
      {
        path: 'OnLineWater',
        component: () => import('@/views/Kxm/OnLineWater'),
        name: 'OnLineWater',
        meta: { title: '实时在线用户', affix: false }
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
  // {
  //   path: '/Champions',
  //   components: Layout,
  //   meta: { title: '盟主生成和管理', icon: 'dashboard', affix: false },
  //   name: 'Champions',
  //   redirect: '/Champions/list',
  //   children: [
  //     {
  //       path: 'list',
  //       components: () => import('@/views/Kxm/Champions/list'),
  //       name: 'list',
  //       meta: { title: '盟主列表' }
  //     },
  //     {
  //       path: 'set',
  //       components: () => import('@/views/Kxm/Champions/set'),
  //       name: 'set',
  //       meta: { title: '盟主管理' }
  //     },
  //     {
  //       path: 'changePassword',
  //       components: () => import('@/views/Kxm/Champions/changePassword'),
  //       name: 'changePassword',
  //       meta: { title: '修改面密码' },
  //       hidden: true
  //     }
  //   ]
  // },
  {
    path: '/notice',
    component: Layout,
    children: [
      {
        path: 'notice',
        component: () => import('@/views/Kxm/notice/index'),
        name: 'notice',
        meta: { title: '公告配置', icon: 'edit', affix: false }
      }
    ]
  },
  {
    path: '/setProxy',
    component: Layout,
    children: [
      {
        path: 'set',
        component: () => import('@/views/Kxm/SetProxy/index'),
        name: 'setProxy',
        meta: { title: '绑定代理', icon: 'bind', affix: false }
      }
    ]
  },
  {
    path: '/backList',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/backList/index'),
        name: 'backList',
        meta: { title: '黑名单', icon: 'backList', affix: false }
      }
    ]
  },
]
export default KxmRouters
