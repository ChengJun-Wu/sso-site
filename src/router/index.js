import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/backend/index'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/backend',
    redirect: '/backend/index',
    component: () => import('@/views/Backend'),
    children: [
      {
        path: 'index',
        component: () => import('@/views/backend/Index')
      },
      {
        path: 'route',
        component: () => import('@/views/backend/Route')
      },
      {
        path: 'auth',
        component: () => import('@/views/backend/Auth')
      },
      {
        path: 'user',
        component: () => import('@/views/backend/User')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
