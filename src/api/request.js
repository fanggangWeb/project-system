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
export function userInfo () {
  return fetch({
    url: `${HTTP}/userInfo/findUserInfo`,
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
// 业务员跟进列表 商务主管反馈列表
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
// 项目经理统计获取全部人员成本
export function memberCostList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/statistics/memberCostList`,
    data,
    method: 'post'
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
// 项目经理 反馈
export function getFeedBack (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/feedback/getFeedbackById`,
    data,
    method: 'post',
    load: true
  })
}
// 项目经理 反馈
export function getFeedBackInfo (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/feedback/getFeedbackInfoById`,
    data,
    method: 'post',
    load: true
  })
}
// 项目经理 新增需求变更
export function addDemandChange (data) {
  return fetch({
    url: `${HTTP}/project/demand/change/insert`,
    data,
    method: 'post',
    load: true
  })
}
// 根据项目主键查询，获取需求变更列表
export function demandList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/demand/change/findByProjectId`,
    data,
    method: 'post',
    load: true
  })
}
// 项目经理 修改需求变更
export function editDemandChange (data) {
  return fetch({
    url: `${HTTP}/project/demand/change/update`,
    data,
    method: 'post',
    load: true
  })
}
// 删除需求变更
export function deldemand (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/demand/change/delete`,
    data,
    method: 'post',
    load: true
  })
}
// 项目经理月评评分
export function managerScore (data) {
  return fetch({
    url: `${HTTP}/grade/managerInsert`,
    params: data,
    method: 'get',
    load: true
  })
}
// 获取考勤记录
export function attendanceInfo (data) {
  return fetch({
    url: `${HTTP}/userInfo/findAttendanceById`,
    params: data,
    method: 'get'
  })
}
// 人员详情 个人详情
export function staffUserInfo (data) {
  return fetch({
    url: `${HTTP}/userInfo/findOne`,
    params: data,
    method: 'get',
    load: true
  })
}
// 查询人员下所有的任务
export function staffDaildyTask (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectDailyTask/findAllByPrincipalId`,
    data,
    method: 'post'
  })
}
// 查询本部门员工排除领导,不分页
export function groupMemberNoPage () {
  return fetch({
    url: `${HTTP}/userInfo/findAllUserInfoByDepartmentManagerNotPage`,
    method: 'get',
    load: true
  })
}
// 项目经理提交每个月的薪资比
export function insertSalary (data) {
  return fetch({
    url: `${HTTP}/performance/insertBatch`,
    method: 'post',
    data,
    load: true
  })
}
// 项目经理查询任务
export function dayTaskList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectDailyTask/findAllByProjectManager`,
    method: 'post',
    data,
    load: true
  })
}
// 项目经理审核日任务未通过
export function refuseDayTask (data) {
  return fetch({
    url: `${HTTP}/projectDailyTask/notFinished`,
    method: 'get',
    params: data,
    load: true
  })
}
// 普通组员月互评
export function memberScore (data) {
  return fetch({
    url: `${HTTP}/grade/memberInsert`,
    method: 'get',
    params: data,
    load: true
  })
}
// 开发人员获取项目任务列表
export function staffTask (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/plan/findByDeveloper`,
    method: 'post',
    data,
    load: true
  })
}
// 开发人员获取项目列表
export function staffProject (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/findByDeveloper`,
    method: 'post',
    data,
    load: true
  })
}
// 领取日任务
export function receiveTask (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectDailyTask/insert`,
    method: 'post',
    data,
    load: true
  })
}
// 获取项目状态列表
export function projectStatus () {
  return fetch({
    url: `${HTTP}/project/findProjectStatusList`,
    method: 'post'
  })
}
// 开发人员 完成情况 是获取外面的日历表
export function getCompleteDate () {
  return fetch({
    url: `${HTTP}/projectDailyTask/getDailyTaskFeedBackStatistics`,
    method: 'get',
    load: true
  })
}
// 普通人员 完成情况 获取日历详情
export function getCompleteInfo (data) {
  return fetch({
    url: `${HTTP}/projectDailyTask/getDailyTaskFeedBackStatisticsInfo`,
    method: 'get',
    params: data,
    load: true
  })
}
// 开发人员提交任务
export function commitTask (data) {
  return fetch({
    url: `${HTTP}/projectDailyTask/commit`,
    method: 'get',
    params: data,
    load: true
  })
}
// 根据项目查询自己的日任务统计
export function taskSatistics (data) {
  return fetch({
    url: `${HTTP}/projectDailyTask/getDailyTaskStatisticsByProjectIdAndPrincipal`,
    method: 'get',
    params: data,
    load: true
  })
}
// 商务主管修改
export function taskUpdate (data) {
  return fetch({
    url: `${HTTP}/saleTask/update`,
    method: 'post',
    data,
    load: true
  })
}
// 业务经理和业务员根据主键查询任务详情
export function saleTaskDetail (data) {
  return fetch({
    url: `${HTTP}/saleTask/findOne`,
    method: 'get',
    params: data,
    load: true
  })
}
// 商务主管 项目进度条件分页查询
export function saleTaskDetailList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/saleTaskChedule/pageQuery`,
    method: 'post',
    data,
    load: true
  })
}
// 添加销售奖金
export function addSaleBonus (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/saleTask/addSaleBonus`,
    method: 'post',
    data,
    load: true
  })
}
// 业务员销售 个人中心数据统计
export function businessStatics (data) {
  return fetch({
    url: `${HTTP}/saleTask/getStatistics`,
    method: 'get',
    params: data,
    load: true
  })
}
// 获取所有的项目 设计主管用
export function allProject (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/pageQuery`,
    method: 'post',
    data,
    load: true
  })
}
// 查询所有设计人员
export function allDesigner () {
  return fetch({
    url: `${HTTP}/userInfo/findAllDesigner`,
    method: 'get'
  })
}
// 根据项目新增设计师
export function insertDesigner (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/designer/insertDesigner`,
    method: 'post',
    data,
    load: true
  })
}
// 设计师个人详情 项目列表
export function designDetailList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/findProjectByDesignerId`,
    method: 'post',
    data,
    load: true
  })
}
// 开发人员个人任务的统计 个人详情用
export function orTaskStatistisc (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectDailyTask/statisticsByPrincipalId`,
    method: 'post',
    data,
    load: true
  })
}
// 人事主管 导入的模板
export function exportUserInfoTemplate () {
  return fetch({
    url: `${HTTP}/userInfo/exportUserInfoTemplate`,
    method: 'get',
    responseType: 'blob'
  })
}
// 导出人员信息的表格
export function exportUserInfo () {
  return fetch({
    url: `${HTTP}/userInfo/exportUserInfo`,
    method: 'get',
    responseType: 'blob'
  })
}
// 项目主管改变项目状态 项目完结
export function finishProject (data) {
  return fetch({
    url: `${HTTP}/project/finished`,
    params: data,
    method: 'get',
    load: true
  })
}
// 项目主管改变项目状态 项目交付
export function deliveryProject (data) {
  return fetch({
    url: `${HTTP}/project/delivery`,
    params: data,
    method: 'get',
    load: true
  })
}
// 动态条件分页查询
export function dynamicList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/advice/pageQueryByReceiver`,
    data,
    method: 'post',
    load: true
  })
}
// 动态详情查询 根据主键查询
export function adviceDetail (data) {
  return fetch({
    url: `${HTTP}/advice/findOne`,
    params: data,
    method: 'get',
    load: true
  })
}
// 获取公司所有人员
export function findAllStaff () {
  return fetch({
    url: `${HTTP}/userInfo/findAllNameAndId`,
    method: 'get'
  })
}
// 动态 发布动态 新增
export function insertAdvice (data) {
  return fetch({
    url: `${HTTP}/advice/insert`,
    data,
    method: 'post',
    load: true
  })
}
// 项目主管给中级和高级工程师评分
export function chargeScore (data) {
  return fetch({
    url: `${HTTP}/grade/chargeInsert`,
    params: data,
    method: 'get',
    load: true
  })
}
// 查询人员等级列表
export function userLevel (data) {
  return fetch({
    url: `${HTTP}/userLevel/findAll`,
    params: data,
    method: 'get'
  })
}
// 获取项目结算
export function projectResult (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectResult/findOne`,
    data,
    method: 'post',
    load: true
  })
}
// 导出车补模板
export function carTemplate () {
  return fetch({
    url: `${HTTP}/carSubsidy/exportTemplate`,
    method: 'get',
    responseType: 'blob'
  })
}
// 导出车补的表格
export function exportAllCar () {
  return fetch({
    url: `${HTTP}/carSubsidy/exportFromExcel`,
    method: 'get',
    responseType: 'blob'
  })
}
// 销售跟进的接口
export function followLists (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/saleTask/pageQueryBySeller`,
    data,
    method: 'post',
    load: true
  })
}
// 开发人员任务获取根据项目获取自己的所有任务的业务 模块 功能名称
export function orStaffSelectList (data) {
  return fetch({
    url: `${HTTP}/project/plan/getPlanSelectList`,
    params: data,
    method: 'get'
  })
}
// 项目经理新增计划
export function insertPlan (data) {
  return fetch({
    url: `${HTTP}/project/plan/insert`,
    data,
    method: 'post'
  })
}
// 项目经理修改计划
export function projectUpdatePlan (data) {
  return fetch({
    url: `${HTTP}/project/plan/update`,
    data,
    method: 'post'
  })
}
// 普通开发人员手动提交升级
export function orStaffUpdate () {
  return fetch({
    url: `${HTTP}/userSalaryRecord/apply`,
    method: 'get',
    load: true
  })
}
// 项目主管的 升级审批列表
export function approvalList (data) {
  return fetch({
    url: `${HTTP}/userSalaryRecord/pageQuery`,
    method: 'get',
    params: data,
    load: true
  })
}
// 项目主管的 升级审批列表
export function toApproval (data) {
  return fetch({
    url: `${HTTP}/userSalaryRecord/review`,
    method: 'get',
    params: data,
    load: true
  })
}
// 项目经理工作补全列表
export function timeCompletion (page, size) {
  // data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectWorkingTimeCompletion/pageQuery?page=${page}&size=${size}`,
    // data,
    method: 'post',
    load: true
  })
}
// 根据日期查询所有日任务不合格列表，并计算考核金额
export function noCompleteTask (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectDailyTask/examine`,
    data,
    method: 'post',
    load: true
  })
}
// 根据日期查询所有日任务不合格列表导出成excel表格
export function exportNoCompleteTask (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/projectDailyTask/examine/excl/export`,
    data,
    method: 'post',
    responseType: 'blob',
    load: true
  })
}
// 所有的项目状态的列表
export function allProjectStatusList () {
  return fetch({
    url: `${HTTP}/project/findProjectStatusList`,
    method: 'post'
  })
}
// 项目经理更改项目的状态
export function changeProjectStatus (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/project/suspend`,
    method: 'post',
    data,
    load: true
  })
}
