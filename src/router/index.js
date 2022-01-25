import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from '../pages/Dashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: dashboard,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "Overview" */ '../pages/Overview.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../pages/Login.vue')
      },
      {
        path: 'depot',
        component: () => import(/* webpackChunkName: "depot" */ '../pages/Depot.vue')
      },
      {
        path: 'transaction',
        component: () => import(/* webpackChunkName: "transaction" */ '../pages/Transaction.vue')
      },
      {
        path: 'approvision',
        component: () => import(/* webpackChunkName: "Approvision" */ '../pages/Approvision.vue')
      },
      {
        path: 'depense',
        component: () => import(/* webpackChunkName: "Depenses" */ '../pages/Depenses.vue')
      },
      { path: "*", redirect: "/"}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
