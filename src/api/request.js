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
// 业务员跟进列表
export function salesFollowList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/saleTask/pageQuery`,
    data,
    method: 'post',
    load: true
  })
}
// 业务员 跟进进度详情列表
export function followDetail (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/saleTaskChedule/pageQuery`,
    data,
    method: 'post',
    load: true
  })
}
// 业务员更改反馈状态
export function updateTaskStatus (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/saleTask/updateTaskStatus`,
    data,
    method: 'post',
    load: true
  })
}
// 业务员添加进度
export function addTaskChedule (data) {
  // data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/saleTaskChedule/insert`,
    data,
    method: 'post',
    load: true
  })
}
// 业务员添加进度
export function editTaskChedule (data) {
  // data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/saleTaskChedule/update`,
    data,
    method: 'post',
    load: true
  })
}
// 业务员删除当前跟进记录
export function delTaskChedule (id) {
  // data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/saleTaskChedule/getById?id=${id}`,
    // params: data,
    method: 'get',
    load: true
  })
}
// 获取项目经理的列表
export function getPMList () {
  return fetch({
    url: `${HTTP}/userInfo/findAllProjectManager`,
    method: 'get'
  })
}
// 项目主管新增指派任务的接口
export function addProjectTask (data) {
  return fetch({
    url: `${HTTP}/projectTask/insert`,
    data,
    method: 'post',
    load: true
  })
}
// 项目主管项目任务列表
export function projectTaskList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectTask/pageQuery`,
    data,
    method: 'post',
    load: true
  })
}
// 项目主管/项目经理 任务 详情
export function projectTaskDetail (data) {
  // data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectTask/findOne`,
    params: data,
    method: 'get',
    load: true
  })
}
// 项目主管任务详情 修改
export function editProjectTask (data) {
  return fetch({
    url: `${HTTP}/projectTask/update`,
    data,
    method: 'post',
    load: true
  })
}
// 销售查询所有已签约任务
export function getAllSigned () {
  return fetch({
    url: `${HTTP}/saleTask/getAllSigned`,
    method: 'get'
  })
}
// 项目经理任务查询
export function proTaskList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectTask/findALlByProjectManager`,
    data,
    method: 'post'
  })
}
// 项目经理任务详情，点击确定按钮
export function confirmProjectTask (data) {
  return fetch({
    url: `${HTTP}/projectTask/confirmProjectTask`,
    params: data,
    method: 'get',
    load: true
  })
}
// 项目经理获取项目的汇总
export function allProSummary (data) {
  return fetch({
    url: `${HTTP}/project/findSummaryByProjectManager`,
    data,
    method: 'post'
  })
}
// 项目经理 获取所有项目列表
export function proProjectList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/findDetailByProjectManager`,
    data,
    method: 'post',
    load: true
  })
}
// 项目经理根据主键，查询项目详情
export function proProjectDetail (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/findById`,
    data,
    method: 'post',
    load: true
  })
}
// 根据项目主键查询，获取里程碑列表
export function milestoneList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/milestone/findByProjectId`,
    data,
    method: 'post'
  })
}
// 根据主键查询，获取项目里程碑
export function milestoneDetail (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/milestone/findById`,
    data,
    method: 'post'
  })
}
// 新增项目里程碑，此接口请勿使用
export function addMileStone (data) {
  return fetch({
    url: `${HTTP}/project/milestone/insert`,
    data,
    method: 'post'
  })
}
// 根据项目里程碑主键查询，获取项目计划列表
export function mileStonePlanList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/plan/findByProjectMilestoneId`,
    data,
    method: 'post',
    load: true
  })
}
// 项目里程碑 计划的表格模板下载
export function mileStoneXlsTem (data) {
  return fetch({
    url: `${HTTP}/project/plan/downloadTemplate`,
    params: data,
    method: 'get',
    responseType: 'blob'
  })
}
// 项目里程碑导出项目计划列表
export function exportXls (data) {
  return fetch({
    url: `${HTTP}/project/plan/exportToExcel`,
    params: data,
    method: 'get',
    responseType: 'blob'
  })
}
// 根据项目，查询开发者列表
export function projectDeveloper (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/developer/findByProjectId`,
    data,
    method: 'post',
    load: true
  })
}
// 根据项目，删除开发者
export function delDeveloper (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/developer/delete`,
    data,
    method: 'post'
  })
}
// 查询所有人员列表
export function allStaff (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/developer/findUserInfoList`,
    data,
    method: 'post'
  })
}
// 根据项目经理查询组员列表
export function groupMember (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/developer/findUserInfoListByProjectManager`,
    data,
    method: 'post',
    load: true
  })
}
// 获取所有人员的忙碌休闲状态
export function findUserStatus () {
  return fetch({
    url: `${HTTP}/userInfo/findAllUserStatus`,
    method: 'get'
  })
}
// 根据项目，新增开发者
export function addDeveloper (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/developer/insert`,
    data,
    method: 'post',
    load: true
  })
}
// 项目经理统计
export function statistics (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/statistics/getStatisticsById`,
    data,
    method: 'post',
    load: true
  })
}
// 项目经理资料文件获取全部
export function getProAllFile (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/file/findByProjectId`,
    data,
    method: 'post',
    load: true
  })
}
// 项目经理资料 新增需求文档
export function addDemand (data) {
  return fetch({
    url: `${HTTP}/project/file/insertDemand`,
    params: data,
    method: 'get',
    load: true
  })
}
// 项目经理资料 新增流程图
export function addFlowChart (data) {
  return fetch({
    url: `${HTTP}/project/file/insertProcess`,
    params: data,
    method: 'get',
    load: true
  })
}
// 项目经理添加原型链接
export function addProtoLink (data) {
  return fetch({
    url: `${HTTP}/project/file/insertPrototypeLink`,
    params: data,
    method: 'get',
    load: true
  })
}
// 项目经理添加设计图链接
export function addDesignLink (data) {
  return fetch({
    url: `${HTTP}/project/file/insertDesignLink`,
    params: data,
    method: 'get',
    load: true
  })
}
// 项目经理资料 删除需求文档
export function delDemand (data) {
  return fetch({
    url: `${HTTP}/project/file/deleteDemand`,
    params: data,
    method: 'get',
    load: true
  })
}
// 项目经理资料 删除流程图
export function delFlowChart (data) {
  return fetch({
    url: `${HTTP}/project/file/deleteProcess`,
    params: data,
    method: 'get',
    load: true
  })
}
// 删除设计图链接
export function delDesign (data) {
  return fetch({
    url: `${HTTP}/project/file/deleteDesignLink`,
    params: data,
    method: 'get',
    load: true
  })
}
// 删除原型图链接
export function delProto (data) {
  return fetch({
    url: `${HTTP}/project/file/deletePrototypeLink`,
    params: data,
    method: 'get',
    load: true
  })
}
