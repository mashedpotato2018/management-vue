import Layout from '@/layout'

const viewRouters = [
  {
    path: '/',
    component: Layout,
    meta: { title: '关系列表', icon: 'user' },
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
        path: '/alliance/playerInfo',
        component: () => import('@/views/ZZQP/alliance/playerInfo/'),
        name: 'alliance-playerInfo',
        meta: { title: '玩家关系列表' }
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
    hidden: true,
    meta: { title: '代理' },
    name: 'proxy',
    redirect: '/proxy/list',
    children: [
      {
        path: '/proxy/list',
        component: () => import('@/views/JunJun/proxy/list'),
        name: 'proxy-list',
        meta: { title: '代理列表' }
      },
      {
        path: 'player-detail',
        component: () => import('@/views/JunJun/proxy/playerDetail'),
        name: 'player-list-detail',
        meta: { title: '玩家详情' },
        hidden: true
      },
      {
        path: '/proxy/AgentRefereeList',
        component: () => import('@/views/JunJun/proxy/RefereeList/'),
        name: 'proxy-AgentRefereeList',
        meta: { title: '代理推荐人列表' }
      },
      {
        path: '/proxy/cardPoint',
        component: () => import('@/views/JunJun/proxy/CardPoint/'),
        name: 'proxy-cardPoint',
        meta: { title: '房卡消耗' },
        hidden: true
      },
    ]
  },
  {
    path: '/Jackpot',
    component: Layout,
    meta: { title: '房间控制', icon: 'Jackpot', roles:['admin'] },
    redirect:'/Jackpot/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/JunJun/Jackpot/List/'),
        name: 'Jackpot-list',
        meta: { title: '房间列表' }
      },
      {
        path: 'record',
        component: () => import('@/views/JunJun/Jackpot/record/'),
        name: 'Jackpot-record',
        meta: { title: '设置记录' }
      },
      {
        path: 'Set',
        component: () => import('@/views/JunJun/Jackpot/Set/'),
        name: 'Jackpot-Set',
        meta: { title: '设置' },
        hidden: true
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    meta: { title: '用户管理', icon: 'bug'},
    name: 'account',
    redirect: '/account/update',
    children: [
      {
        path: '/account/update',
        component: () => import('@/views/ZZQP/manage/setUser'),
        name: 'update',
        meta: { title: '用户设置' }
      },
      {
        path: '/account/blacklist',
        component: () => import('@/views/ZZQP/manage/blackList'),
        name: 'blacklist',
        meta: { title: '黑名单' }
      },
      {
        path: '/account/whitelist',
        component: () => import('@/views/ZZQP/manage/whiteList/'),
        name: 'whitelist',
        meta: { title: '定位白名单' }
      }
    ]
  },
  {
    path: '/record',
    redirect: '/record/list',
    component: Layout,
    meta: { title: '记录查询', icon: 'search' , roles:['admin']},
    name: 'record',
    children: [
      {
        path: 'ChangeScore',
        component: () => import('@/views/ZZQP/player/ChangeScore'),
        name: 'ChangeScore',
        meta: { title: '玩家金币变化记录' }
      },
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
        meta: { title: '玩家出借记录' }
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
        meta: { title: '珍珠转房卡记录' }
      }
    ]
  },
  {
    path: '/static',
    component: Layout,
    meta: { title: '统计', icon: 'chart', roles:['admin'] },
    name: 'statistics',
    redirect: '/static/GetAddAgent',
    children: [
      {
        path: 'Online',
        component: () => import('@/views/ZZQP/statistics/Online'),
        name: 'Online',
        meta: { title: '实时在线' }
      },
      {
        path: 'GetAddAgent',
        component: () => import('@/views/ZZQP/statistics/GetAddAgent'),
        name: 'GetAddAgent',
        meta: { title: '每日新增代理' }
      },
      {
        path: 'Register',
        component: () => import('@/views/ZZQP/statistics/Register'),
        name: 'Register',
        meta: { title: '每日注册' }
      },
      {
        path: 'logon',
        component: () => import('@/views/ZZQP/statistics/Logon'),
        name: 'logon',
        meta: { title: '每日登录' }
      },
      {
        path: 'Jackpot',
        component: () => import('@/views/ZZQP/statistics/Jackpot'),
        name: 'Jackpot',
        meta: { title: '每日奖池' }
      },
      {
        path: 'room',
        component: () => import('@/views/ZZQP/statistics/Room'),
        name: 'room',
        meta: { title: '每日房间对局' }
      },
      {
        path: 'card',
        component: () => import('@/views/ZZQP/statistics/Card'),
        name: 'card',
        meta: { title: '每日房卡' }
      },
      {
        path: 'Alliance',
        component: () => import('@/views/ZZQP/statistics/Alliance'),
        name: 'Alliance',
        meta: { title: '每日盟主收益' }
      },
      {
        path: 'Agent',
        component: () => import('@/views/ZZQP/statistics/Agent'),
        name: 'Agent',
        meta: { title: '每日代理收益' }
      },
      {
        path: 'Referee',
        component: () => import('@/views/ZZQP/statistics/Referee'),
        name: 'Referee',
        meta: { title: '每日代理推荐人收益' }
      },
      {
        path: 'Recharge',
        component: () => import('@/views/ZZQP/statistics/Recharge'),
        name: 'Recharge',
        meta: { title: '每日充值' }
      },
      {
        path: 'AllScore',
        component: () => import('@/views/ZZQP/statistics/AllScore'),
        name: 'AllScore',
        meta: { title: '每日联盟总珍珠' }
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    meta: { title: '公告', icon: 'lamp' , roles:['admin']},
    redirect: '/notice/lamp',
    children: [
      {
        path: 'lamp',
        component: () => import('@/views/ZZQP/notice/lamp'),
        name: 'lamp',
        meta: { title: '跑马灯' }
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
export default viewRouters
