import fetch from '@/utils/fetch'
import qs from 'qs'
// import { $HTTP } from '@/utils/config'
// 用户登录
export function login(data) {
  let use = {
    account: data.name,
    pwd: data.password
  }
  use = qs.stringify(use)
  return fetch({
    // url: `${$HTTP}/login/up`,
    // url: '/api/login',
    url: 'https://www.easy-mock.com/mock/5ae691f47e1b090ed5b8d7d9/oa/login',
    data: use,
    method: 'post',
    load: true
  })
}
// 用户拉取信息
export function fetchUserInfo(token) {
  let data = {token}
  data = qs.stringify(data)
  return fetch({
    // url: '/api/token',
    // url: `${$HTTP}/user/getToken`,
    url: 'https://www.easy-mock.com/mock/5ae691f47e1b090ed5b8d7d9/oa/fetch/userInfo',
    data,
    method: 'post'
  })
}
