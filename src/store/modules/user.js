// import { setCookie, getCookie, removeCookie } from '@/utils/cookie'
function set (name, val) {
  sessionStorage.setItem(name, val)
}
function get (name) {
  return sessionStorage.getItem(name)
}
function remove (name) {
  return sessionStorage.removeItem(name)
}
const user = {
  state: {
    token: get('token'),
    name: get('name'),
    position: get('position'),
    role: get('role'),
    id: get('id')
  },
  getters: {
    gettoken: state => state.token,
    getname: state => state.name,
    getposition: state => state.position,
    getrole: state => state.role,
    getid: state => state.id
  },
  mutations: {
    token (state, token) {
      state.token = token
      set('token', token)
    },
    name (state, name) {
      set('name', name)
      state.name = name
    },
    position (state, data) {
      set('position', data)
      state.position = data
    },
    role (state, role) {
      set('role', role)
      state.role = role
    },
    id (state, id) {
      set('id', id)
      state.id = id
    }
  },
  actions: {
    // 用户注销
    FedLogout({commit}) {
      return new Promise((resolve) => {
        commit('token', '')
        commit('name', '')
        commit('position', '')
        commit('role', '')
        commit('id', '')
        remove('token')
        remove('name')
        remove('position')
        remove('role')
        remove('id')
        resolve()
      })
    }
  }
}
export default user
