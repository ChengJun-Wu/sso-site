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
