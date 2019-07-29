import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import {viewRouters} from '@/utils/module'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/base/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/base/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/base/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/base/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/base/error-page/401'),
    hidden: true
  },
  ...viewRouters
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
