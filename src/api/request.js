import fetch from '@/utils/fetch'
import { HTTP } from '../utils/config'
import qs from 'qs'
// 登陆接口
export function login (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/authentication/form`,
    data,
    method: 'post',
    load: true
  })
}
// 登陆以后获取人员信息
export function userInfo (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/userInfo/findUserInfo`,
    data,
    method: 'get',
    load: true
  })
}
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
// 获取本部员工列表去除领导
export function getDepartmentUsersList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/userInfo/findAllUserInfoByDepartmentManager`,
    method: 'post',
    data
  })
}
// 商务主管指派任务
export function saleReleaseTask (data) {
  // data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/saleTask/insert`,
    method: 'post',
    data
  })
}
// 项目经理人员 组员列表  人事主管所有员工列表
export function groupMemberList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/userInfo/pageQuery`,
    data,
    method: 'post',
    load: true
  })
}
// 人事主管删除人员
export function delStaff (data) {
  // data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/userInfo/deleteById`,
    params: data,
    method: 'get'
  })
}
// 查询所有岗位
export function allPosition () {
  return fetch({
    url: `${HTTP}/userInfo/findAllPosition`,
    method: 'get'
  })
}
// 查询所有部门列表
export function allDepartment (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/userDepartment/pageQuery`,
    method: 'post',
    data
  })
}
// 人事查询绩效的所有列表
export function performanceList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/performance/pageQuery`,
    data,
    method: 'post',
    load: true
  })
}
// 人事 导出所有员工的绩效信息
export function exportPerformance (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/performance/exportPerformance`,
    data,
    method: 'post',
    responseType: 'blob'
  })
}
// 人员获取钉钉的token
export function getAccessToken () {
  return fetch({
    url: `${HTTP}/dingding/getAccessToken`,
    method: 'get'
  })
}
// 导入人员、部门等数据
export function importUsers (data) {
  return fetch({
    url: `${HTTP}/dingding/importUsersNotUpdate`,
    params: data,
    method: 'get'
  })
}
