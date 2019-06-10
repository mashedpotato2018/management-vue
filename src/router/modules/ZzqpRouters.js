import Layout from '@/layout'

const KxmRouters = [
  {
    path: '/',
    component: Layout,
    redirect: '/player',
    children: [
      {
        path: 'player',
        component: () => import('@/views/ZZQP/player/index'),
        name: 'player',
        meta: { title: '玩家管理', icon: 'peoples', affix: true }
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
        component: () => import('@/views/ZZQP/Champions/list'),
        name: 'list',
        meta: { title: '盟主列表' }
      },
      {
        path: 'set',
        component: () => import('@/views/ZZQP/Champions/set'),
        name: 'set',
        meta: { title: '盟主管理' }
      },
      {
        path: 'changePassword',
        component: () => import('@/views/ZZQP/Champions/changePassword'),
        name: 'changePassword',
        meta: { title: '修改面密码' },
        hidden: true
      }
    ]
  }
]
export default KxmRouters
