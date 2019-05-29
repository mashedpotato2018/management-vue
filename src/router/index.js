import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/player',
    children: [
      {
        path: 'player',
        component: () => import('@/views/player/index'),
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
        component: () => import('@/views/proxy/index'),
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
        component: () => import('@/views/combat/index'),
        name: 'combat',
        meta: { title: '战绩查询', icon: 'search', affix: false }
      }
    ]
  },
  // {
  //   path: '/HallWater',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',
  //       component: () => import('@/views/HallWater/index'),
  //       name: 'HallWater',
  //       meta: { title: '大厅流水', icon: 'dashboard', affix: false }
  //     }
  //   ]
  // },
  {
    path: '/Line',
    component: Layout,
    children: [
      {
        path: 'Chart',
        component: () => import('@/views/HallWater/Line'),
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
        component: () => import('@/views/GivingRecords/index'),
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
        component: () => import('@/views/PlayersCrunchies/index'),
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
        component: () => import('@/views/recharge/index'),
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
        component: () => import('@/views/Withdrawal/Pending'),
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
        component: () => import('@/views/Withdrawal/Record'),
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
        component: () => import('@/views/Champions/list'),
        name: 'list',
        meta: { title: '盟主列表' }
      },
      {
        path: 'set',
        component: () => import('@/views/Champions/set'),
        name: 'set',
        meta: { title: '盟主管理' }
      },
      {
        path: 'changePassword',
        component: () => import('@/views/Champions/changePassword'),
        name: 'changePassword',
        meta: { title: '修改面密码' },
        hidden: true
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
