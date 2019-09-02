import Layout from '@/layout'

const viewRouters = [
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
    path: '/champions',
    component: Layout,
    meta: { title: '盟主', icon: 'Champions', affix: false },
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/Champions/list/'),
        name: 'champions',
        meta: { title: '盟主列表', affix: false }
      },
      {
        path: 'changePassword',
        component: () => import('@/views/Kxm/Champions/changePassword/'),
        name: 'changePassword',
        meta: { title: '更改密码', affix: false },
        hidden: true
      },
      {
        path: 'add',
        component: () => import('@/views/Kxm/Champions/add/'),
        name: 'add-Champions',
        meta: { title: '注册盟主', affix: false },
        hidden: true
      },
    ]
  },
  {
    path: '/Partner',
    component: Layout,
    meta: { title: '合伙人', icon: 'Partner', affix: false },
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/Partner/list/'),
        name: 'Partner',
        meta: { title: '合伙人列表', affix: false }
      },
      {
        path: 'ContributeList',
        component: () => import('@/views/Kxm/Partner/Contribute/'),
        name: 'ContributeList',
        meta: { title: '合伙人每周贡献', affix: false }
      },
      {
        path: 'ContributeDetail',
        component: () => import('@/views/Kxm/Partner/ContributeDetail/'),
        name: 'ContributeDetail',
        meta: { title: '每周贡献详情', affix: false },
        hidden: true
      },
    ]
  },
  {
    path: '/combat',
    component: Layout,
    meta:{ roles:['admin'] },
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
    meta:{ roles:['admin'] },
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
    path: '/Jackpot',
    component: Layout,
    meta: { roles:['admin'], title: '奖池', icon: 'Jackpot', affix: false },
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/Jackpot/List/'),
        name: 'Jackpot-list',
        meta: { title: '奖池列表', icon: 'Jackpot', affix: false }
      },
      {
        path: 'set',
        component: () => import('@/views/Kxm/Jackpot/Set/'),
        name: 'Jackpot-set',
        meta: { title: '设置奖池' },
        hidden: true
      }
    ]
  },
  {
    path: '/Line',
    component: Layout,
    meta: { roles:['admin'], title: '图表统计', icon: 'chart', affix: false },
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
    meta:{ roles:['admin'] },
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
    meta: { roles:['admin'], title: '榜单', icon: 'nested', affix: false },
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/PlayersCrunchies/index'),
        name: 'PlayersCrunchies',
        meta: { title: '输赢榜', affix: false }
      },
      {
        path: 'dividend',
        component: () => import('@/views/Kxm/dividend/index'),
        name: 'dividend',
        meta: { title: '红利榜', affix: false }
      },
      {
        path: 'transaction',
        component: () => import('@/views/Kxm/transaction/index'),
        name: 'transaction',
        meta: { title: '手数榜', affix: false }
      }
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    meta:{roles:['admin']},
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
    meta:{roles:['admin']},
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
    meta:{roles:['admin']},
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
    meta:{roles:['admin']},
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
    path: '/horse',
    component: Layout,
    meta:{roles:['admin']},
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/horse/index'),
        name: 'horseList',
        meta: { title: '跑马灯', icon: 'horse-lamp', affix: false }
      },
      {
        path: 'set',
        component: () => import('@/views/Kxm/horse/set'),
        name: 'setHorse',
        meta: { title: '设置跑马灯', affix: false },
        hidden: true
      }
    ]
  },
  {
    path: '/setProxy',
    component: Layout,
    meta:{ roles:['admin'] },
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
    meta:{ roles:['admin'] },
    children: [
      {
        path: 'list',
        component: () => import('@/views/Kxm/backList/index'),
        name: 'backList',
        meta: { title: '黑名单', icon: 'backList', affix: false }
      }
    ]
  }
]
export default viewRouters
