import axios from 'axios'
// import Vue from 'vue'
// const vm = new Vue()
// import store from '@/store'
import {
  Message,
  Loading
} from 'element-ui'
// 数据失败的提示
export function MessageError(message = '服务器出错，请联系后台管理人员') {
  Message({
    type: 'error',
    showClose: true,
    message
  })
}
const instance = axios.create({
  baseURL: process.env.BASE_API,
  // 设置请求可以携带cookie
  withCredentials: true,
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

// 添加一个请求拦截器
instance.interceptors.request.use(config => {
  if (config.load) {
    startLoading()
  }
  // 后期根据token做处理
  // if (store.getters.token) {
  //   config.headers['token'] = store.getters.token
  // }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
// 添加一个返回拦截器
instance.interceptors.response.use(res => {
  if (loading) {
    endLoading()
  }
  return res
}, error => {
  // MessageError('访问出错')
  if (loading) {
    endLoading()
  }
  // alert(JSON.stringify(error))
  const code = error.response.data.state
  switch (code) {
    case 400:
      MessageError('错误请求')
      break
    case 401:
      MessageError('未授权，请重新登录')
      break
    case 403:
      MessageError(error.response.data.message)
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
  Promise.reject(error)
})
export default instance
