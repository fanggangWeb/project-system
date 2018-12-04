import axios from 'axios'
import router from '../router/index'
import store from '@/store'
import { Message, Loading } from 'element-ui'
// 数据失败的提示
export function MessageError (message) {
  Message({
    type: 'error',
    showClose: true,
    message
  })
}

const instance = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true, // 设置请求可以携带cookie
  timeout: 10000
})

let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中......',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {
  loading.close()
}

instance.interceptors.request.use(config => { // 添加一个请求拦截器
  if (config.load) { startLoading() }
  //   config.headers['token'] = store.getters.token // 附加请求头
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

instance.interceptors.response.use(res => { // 添加一个返回拦截器
  if (loading) { endLoading() }
  if (res.data.state === 401) {
    MessageError('未授权，请重新登录')
    store.dispatch('FedLogout')
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
  return res
}, error => {
  if (loading) { endLoading() }
  // alert(JSON.stringify(error))
  let code, message
  if (error.response) {
    code = error.response.data.state
    message = error.response.data.message
  }
  if (code) {
    switch (code) {
      case 400:
        MessageError('错误请求')
        break
      case 401:
        MessageError('未授权，请重新登录')
        store.dispatch('FedLogout')
        setTimeout(() => {
          router.push('/')
        }, 1500)
        break
      case 403:
        // MessageError('拒绝访问')
        MessageError(message)
        break
      case 404:
        MessageError('请求错误,未找到该资源')
        break
      case 405:
        MessageError('请求方法未允许')
        break
      case 408:
        MessageError('请求超时')
        break
      case 500:
        MessageError('服务器端出错')
        break
      case 501:
        MessageError('网络未实现')
        break
      case 502:
        MessageError('网络错误')
        break
      case 503:
        MessageError('服务不可用')
        break
      case 504:
        MessageError('网络超时')
        break
      case 505:
        MessageError('http版本不支持该请求')
        break
      default:
        MessageError(`连接错误`)
    }
  } else {
    MessageError('连接错误')
  }
  Promise.reject(error)
})
export default instance
