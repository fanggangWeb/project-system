import fetch from '@/utils/fetch'
import { HTTP } from '../utils/config'
import qs from 'qs'
// 登陆接口
export function login(data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/authentication/form`,
    data,
    method: 'post',
    load: true
  })
}
// 项目经理人员 组员列表查询
export function groupMemberList(data) {
  return fetch({
    url: `${HTTP}/userInfo/pageQuery`,
    data,
    method: 'post',
    load: true
  })
}