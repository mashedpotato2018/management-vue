import Layout from '@/layout'

const KxmRouters = [
  {
    path: '/',
    component: Layout,
    redirect: '/statistics',
    meta: { title: '玩家', icon: 'chart', affix: true },
    children: [
      {
        path: '/statistics',
        component: () => import('@/views/ZZQP/player/statistics'),
        name: 'statistics',
        meta: { title: '输赢统计'}
      }
    ]
  },
  {
    path: '/proxy',
    component: Layout,
    meta: { title: '代理', icon: 'tree' },
    name:'proxy',
    redirect: '/proxy/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/ZZQP/proxy/list'),
        name: 'proxy-list',
        meta: { title: '代理列表'}
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
      },
      {
        path: 'player-yield',
        component: () => import('@/views/ZZQP/proxy/playerYield'),
        name: 'proxy-player-yield',
        meta: { title: '玩家贡献收益'}
      },
      {
        path: 'proxy-yield',
        component: () => import('@/views/ZZQP/proxy/proxyYield'),
        name: 'proxy-proxy-yield',
        meta: { title: '下级代理推荐奖励'}
      }
    ]
  },
  {
    path: '/alliance',
    component: Layout,
    meta: { title: '盟主', icon: 'user' },
    name:'alliance',
    redirect: '/alliance/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/ZZQP/alliance/list'),
        name: 'alliance-list',
        meta: { title: '盟主列表'}
      },
      {
        path: 'proxy-list',
        component: () => import('@/views/ZZQP/alliance/openList'),
        name: 'alliance-proxy-list',
        meta: { title: '开通代理列表'}
      },
      {
        path: 'player-yield',
        component: () => import('@/views/ZZQP/alliance/playerYield'),
        name: 'alliance-player-yield',
        meta: { title: '所属玩家贡献'}
      },
      {
        path: 'proxy-yield',
        component: () => import('@/views/ZZQP/alliance/proxyYield'),
        name: 'alliance-proxy-yield',
        meta: { title: '所属代理贡献'}
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
        meta: { title: '玩家输赢记录'},
      },
      {
        path: 'score',
        component: () => import('@/views/ZZQP/player/score'),
        name: 'upDownRecord',
        meta: { title: '玩家上下分记录' },
      },
      {
        path: 'deploy',
        component: () => import('@/views/ZZQP/proxy/deployRecord'),
        name: 'proxy-deploy',
        meta: { title: '代理调配记录'}
      }
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    meta: { title: '充值', icon: 'shopping' },
    name:'recharge',
    redirect: '/recharge/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/ZZQP/recharge/index'),
        name: 'recharge-list',
        meta: { title: '充值记录'}
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    meta: { title: '用户管理', icon: 'bug' },
    name:'account',
    redirect: '/account/update',
    children: [
      {
        path: 'update',
        component: () => import('@/views/ZZQP/manage/setUser'),
        name: 'update',
        meta: { title: '用户设置'}
      },
      {
        path: 'blacklist',
        component: () => import('@/views/ZZQP/manage/blackList'),
        name: 'blacklist',
        meta: { title: '黑名单'}
      }
    ]
  }
]
export default KxmRouters
