import router from './router'
import store from './store'
const whiteList = ['/'] // 定义登录白名单
router.beforeEach((to, from, next) => {
  if (store.getters.getrouters) {
    next()
  } else {
    // 如果token不存在
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果输入的路由执行登录页面, 则不做操作
      next()
    } else {
      // 如果输入不是login路由
      next('/')
    }
  }
})
