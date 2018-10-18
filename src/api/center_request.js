import fetch from '@/utils/fetch'
import { HTTP } from '../utils/config'
import qs from 'qs'
// 获取用户信息
export function getUerInfo () {
  return fetch({
    url: `${HTTP}/userInfo/findUserInfo`,
    method: 'get',
    load: true
  })
}
// 修改用户登录密码
export function modifyPassword (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/userInfo/changePassword`,
    method: 'post',
    data,
    load: true
  })
}
// 获取本部员工列表
export function getDepartmentUsersList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/userInfo/findAllUserInfoByDepartmentManager`,
    method: 'post',
    data
  })
}
