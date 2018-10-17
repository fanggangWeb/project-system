import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
// import {stateRoute} from '../router/index'
// 简化sessionStorage的getItem和setItem
function set (name, val) {
  sessionStorage.setItem(name, val)
}
function get (name) {
  return sessionStorage.getItem(name)
}
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user
  },
  state: {
    routers: get('routers'),
    projectId: get('projectId')
  },
  getters: {
    getrouters: state => state.routers,
    getprojectId: state => state.projectId
  },
  mutations: {
    projectId (state, data) {
      state.projectId = data
      set('projectId', data)
    },
    routers (state, data) {
      state.routers = data
      set('routers', data)
    }
  }
})
export default store
