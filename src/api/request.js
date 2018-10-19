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
