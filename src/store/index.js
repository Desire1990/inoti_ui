import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: null,
    // url:"/api",
    url: 'http://localhost:8000/api',
    // url:'https://inoti.amidev.bi/api',
    account:[],
    depots: [],
    transactions: [],
    approvisions:[],
    depenses:[],
    taux:[],
    stats:[]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
 