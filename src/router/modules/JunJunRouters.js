import Layout from '@/layout'

const viewRouters = [

  {
    path: '/',
    component: Layout,
    meta: { title: '盟主', icon: 'user' },
    name: 'alliance',
    redirect: '/alliance/list',
    children: [
      {
        path: '/alliance/list',
        component: () => import('@/views/ZZQP/alliance/list'),
        name: 'alliance-list',
        meta: { title: '盟主列表' }
      },
      {
        path: '/alliance/proxy-list',
        component: () => import('@/views/ZZQP/alliance/openList'),
        name: 'alliance-proxy-list',
        meta: { title: '开通代理列表' }
      },
      {
        path: '/alliance/alliance-yield',
        component: () => import('@/views/JunJun/alliance/allianceYield'),
        name: 'alliance-alliance-yield',
        meta: { title: '所属副盟主贡献' },
        hidden: true
      },
      {
        path: '/alliance/proxy-yield',
        component: () => import('@/views/ZZQP/alliance/proxyYield'),
        name: 'alliance-proxy-yield',
        meta: { title: '所属代理贡献' },
        hidden: true
      },
      {
        path: '/alliance/player-yield',
        component: () => import('@/views/ZZQP/alliance/playerYield'),
        name: 'alliance-player-yield',
        meta: { title: '所属玩家贡献' },
        hidden: true
      }
    ]
  },
  {
    path: '/proxy',
    component: Layout,
    meta: { title: '代理', icon: 'tree' },
    name: 'proxy',
    redirect: '/proxy/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/ZZQP/proxy/list'),
        name: 'proxy-list',
        meta: { title: '代理列表' }
      },
      {
        path: 'proxy-detail',
        component: () => import('@/views/ZZQP/proxy/proxyDetail'),
        name: 'proxy-list-detail',
        meta: { title: '代理详情' },
        hidden: true
      },
      {
        path: 'player-detail',
        component: () => import('@/views/ZZQP/proxy/playerDetail'),
        name: 'player-list-detail',
        meta: { title: '玩家详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    meta: { icon: 'chart' },
    children: [
      {
        path: '/statistics',
        component: () => import('@/views/ZZQP/player/statistics'),
        name: 'statistics',
        meta: { title: '玩家输赢统计' }
      }
    ]
  },
  {
    path: '/record',
    redirect: '/record/list',
    component: Layout,
    meta: { title: '记录查询', icon: 'search' },
    name: 'record',
    children: [
      {
        path: 'list',
        component: () => import('@/views/ZZQP/player/record'),
        name: 'WinRecord',
        meta: { title: '玩家输赢记录' }
      },
      {
        path: 'score',
        component: () => import('@/views/ZZQP/player/score'),
        name: 'upDownRecord',
        meta: { title: '玩家上下分记录' }
      },
      {
        path: 'deploy',
        component: () => import('@/views/ZZQP/proxy/deployRecord'),
        name: 'proxy-deploy',
        meta: { title: '代理调配记录' }
      },
      {
        path: 'cardNum',
        component: () => import('@/views/ZZQP/proxy/CardNumRcord'),
        name: 'cardNum',
        meta: { title: '代理房卡充值记录' }
      }
    ]
  },
  {
    path: '/Trans',
    component: Layout,
    meta: { title: '珍珠转换点卡记录', icon: 'guide' },
    name: 'Trans',
    redirect: '/Trans/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/ZZQP/Trans/index'),
        name: 'Trans-list',
        meta: { title: '珍珠转换点卡记录' }
      }
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    meta: { title: '充值', icon: 'shopping' },
    name: 'recharge',
    redirect: '/recharge/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/ZZQP/recharge/index'),
        name: 'recharge-list',
        meta: { title: '充值记录' }
      }
    ]
  }
]
export default viewRouters
