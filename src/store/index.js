import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    url: 'http://localhost:8000/api',
    account:[],
    depots: [],
    transactions: [],
    approvisions:[],
    depenses:[]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
 