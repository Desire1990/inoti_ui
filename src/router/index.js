import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../pages/Login.vue'
import depot from '../pages/Depot.vue'
import overview from '../pages/Overview.vue'
import taux from '../components/Taux.vue'
import approvision from '../pages/Approvision.vue'
import depense from '../pages/Depenses.vue'

Vue.use(VueRouter)

const routes = [
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
        path: '/transfer',
        component: () => import(/* webpackChunkName: "depot" */ '../pages/Depot.vue')
      },
      {
        path: '/taux',
        component: () => import(/* webpackChunkName: "transaction" */ '../components/Taux.vue')
      },
      {
        path: '/approvision',
        component: () => import(/* webpackChunkName: "Approvision" */ '../pages/Approvision.vue')
      },
      {
        path: '/depense',
        component: () => import(/* webpackChunkName: "Depenses" */ '../pages/Depenses.vue')
      }
      // { path: "*", redirect: "/"}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
