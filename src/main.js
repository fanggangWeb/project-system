import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import 'style/index.styl'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import ElementUi from 'element-ui'
import store from './store'
import * as msg from './utils/message'
import './permission'
import './style/reset.styl'
Vue.config.productionTip = false
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
