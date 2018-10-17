// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import 'style/index.styl'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import ElementUi from 'element-ui'
import store from './store'
import * as msg from './utils/message'
// import './permission'
import './style/reset.styl'
Vue.config.productionTip = false
// Vue.prototype.formCreate = formCreate
// 开发模式下跳过登陆验证的peirssion.js，直接进行动态路由添加，进行页面开发
// store.dispatch('GenerateRoutes', store.getters.roles).then(() => {
//   router.addRoutes(store.getters.activeRouter) // 添加动态路由
// })
Vue.use(ElementUi)
// 自定义封装消息提示框
Object.keys(msg).forEach(key => {
  Vue.prototype[key] = msg[key]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
