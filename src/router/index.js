import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
Vue.use(Router)
// 如果是在开发模式下关闭懒加载，在生产版本中实现懒加载
const _import = require('./_import_' + process.env.NODE_ENV)
export const stateRoute = [
  {
    path: '/',
    name: 'login',
    hidden: true,
    component: _import('login')
  }
]
export const proManager = [ // 项目经理
  {
    path: 'task',
    name: '任务'
  }, {
    path: 'project',
    name: '项目'
  }, {
    path: 'approval',
    name: '审批'
  }, {
    path: 'person',
    name: '人员'
  }, {
    path: 'dynamic',
    name: '动态'
  }]
export const orWorker = [ // 普通开发人员
  {
    path: 'orTask',
    name: '任务'
  }, {
    path: 'orProject',
    name: '项目'
  }, {
    path: 'orSocre',
    name: '评分'
  }, {
    path: 'orDynamic',
    name: '动态'
  }]
export const proSupervisor = [ // 项目主管
  {
    path: 'superTask',
    name: '任务'
  }, {
    path: 'superProject',
    name: '项目'
  }, {
    path: 'superPerson',
    name: '人员'
  }, {
    path: 'superApproval',
    name: '审批'
  }, {
    path: 'superDynamic',
    name: '动态'
  }
]
export const busSupervisor = [ // 商务主管
  {
    path: 'busSuperfeedback',
    name: '反馈'
  }, {
    path: 'busSuperPerson',
    name: '人员'
  }, {
    path: 'busSuperDynamic',
    name: '动态'
  }
]
export const business = [ // 业务员
  { path: 'follow',
    name: '跟进'
  }, {
    path: 'busDynamic',
    name: '动态'
  }
]
export const personnel = [ // 人事路由
  {
    path: 'perPerson',
    name: '人员'
  }, {
    path: 'performance',
    name: '绩效'
  }
]
export const superDesign = [ // 设计主管
  {
    path: 'assign',
    name: '分配'
  }, {
    path: 'superDesPerson',
    name: '人员'
  }, {
    path: 'superDesDynamic',
    name: '动态'
  }
]
// 项目经理的路由
export const mainRoute = {
  path: '/home',
  name: '主页',
  component: home,
  children: [{
    path: 'task',
    name: '任务',
    component: _import('proManager/task/index')
  }, {
    path: 'project',
    name: '项目',
    component: _import('proManager/project/index')
  }, {
    path: 'approval',
    name: '审批',
    component: _import('proManager/approval/index'),
    children: [{
      path: '/',
      name: '日任务审批',
      component: _import('proManager/approval/daytask')
    }, {
      path: 'transfer',
      name: '人员借调审批',
      component: _import('proManager/approval/transfer')
    }, {
      path: 'salary',
      name: '调薪审批',
      component: _import('proManager/approval/salary')
    }]
  }, {
    path: 'daytaskDetail',
    name: '日任务详情',
    noShow: true,
    component: _import('proManager/approval/daytask-detail')
  }, {
    path: 'person',
    name: '人员',
    component: _import('proManager/person/index'),
    children: [{
      path: '/',
      name: '人员列表',
      component: _import('proManager/person/person-list')
    }, {
      path: 'staffSalary',
      name: '薪资',
      component: _import('proManager/person/staff-salary')
    }, {
      path: 'timeAdd',
      name: '工作时间补全',
      component: _import('proManager/person/time-add')
    }]
  }, {
    path: 'dynamic',
    name: '动态',
    component: _import('proManager/dynamic/index')
  }, {
    path: 'release',
    name: '发布动态',
    noShow: true,
    component: _import('proManager/dynamic/release')
  }, {
    path: 'projectDetail',
    name: '项目详情',
    noShow: true,
    children: [{
      path: '/',
      name: '项目概况',
      component: _import('proManager/project/project-detail-summary')
    }, {
      path: 'landmark',
      name: '项目里程碑',
      component: _import('proManager/project/project-detail-landmark')
    }, {
      path: 'participants',
      name: '参与人员',
      component: _import('proManager/project/project-detail-participants')
    }, {
      path: 'data',
      name: '项目资料',
      component: _import('proManager/project/project-detail-data')
    }, {
      path: 'statistics',
      name: '项目统计',
      component: _import('proManager/project/project-detail-statistics')
    }, {
      path: 'feedback',
      name: '项目反馈',
      component: _import('proManager/project/project-detail-feedback')
    }, {
      path: 'demand',
      name: '需求变更',
      component: _import('proManager/project/project-detail-demand')
    }],
    component: _import('proManager/project/project-detail')
  }, {
    path: 'projectAdd',
    name: '新增项目',
    noShow: true,
    component: _import('proManager/project/project-add')
  }, {
    path: 'staffDetail',
    name: '人员详情',
    noShow: true,
    component: _import('proManager/person/staff-detail')
  }, {
    path: 'center',
    name: '个人中心',
    noShow: true,
    component: _import('proManager/center')
  }, {
    path: 'addStaff',
    name: '添加项目参与人员',
    component: _import('proManager/project/add-staff')
  },
  // 上面是项目经理的路由
  // 下面是开发人员的路由
  {
    path: 'orTask',
    name: '开发人员任务',
    component: _import('orStaff/task/index'),
    children: [{
      path: '/',
      name: '任务列表',
      component: _import('orStaff/task/taskList')
    }, {
      path: 'completion',
      name: '任务列表',
      component: _import('orStaff/task/completion')
    }]
  }, {
    path: 'orProject',
    name: '开发人员项目',
    component: _import('orStaff/project/index')
  }, {
    path: 'orProjectDetail',
    name: '开发人员项目详情',
    component: _import('orStaff/project/detail'),
    children: [{
      path: '/',
      name: '开发人员项目概况',
      component: _import('orStaff/project/project-summary')
    }, {
      path: 'data',
      name: '开发人员项目资料',
      component: _import('orStaff/project/project-data')
    }, {
      path: 'complete',
      name: '开发人员任务完成率',
      component: _import('orStaff/project/project-complete')
    }]
  }, {
    path: 'orDynamic',
    name: '动态',
    component: _import('orStaff/dynamic/index')
  }, {
    path: 'orRelease',
    name: '发布动态',
    noShow: true,
    component: _import('orStaff/dynamic/release')
  }, {
    path: 'orSocre',
    name: '普通员工评分',
    component: _import('orStaff/score/index')
  }, {
    // 下面是项目主管的路由
    path: 'superTask',
    name: '项目主管任务',
    component: _import('proSupervisor/task/index')
  }, {
    path: 'superTaskDetail',
    name: '项目主管任务详情',
    component: _import('proSupervisor/task/detail')
  }, {
    path: 'superProject',
    name: '项目主管项目',
    component: _import('proSupervisor/project/index')
  }, {
    path: 'superProjectDetail',
    name: '项目主管项目详情',
    component: _import('proSupervisor/project/detail'),
    children: [{
      path: '/',
      name: '项目概况',
      component: _import('proSupervisor/project/project-summary')
    }, {
      path: 'landmark',
      name: '项目里程碑',
      component: _import('proSupervisor/project/project-landmark')
    }, {
      path: 'daytask',
      name: '项目日任务',
      component: _import('proSupervisor/project/project-daytask')
    }]
  }, {
    path: 'superPerson',
    name: '项目主管人员',
    component: _import('proSupervisor/person/index')
  }, {
    path: 'superApproval',
    name: '项目主管审批',
    component: _import('proSupervisor/approval/index')
  }, {
    path: 'superDynamic',
    name: '项目主管动态',
    component: _import('proSupervisor/dynamic/index')
  }, {
    path: 'superRelease',
    name: '项目主管发布动态',
    component: _import('proSupervisor/dynamic/release')
  }, {
    path: 'superPersonDetail',
    name: '项目主管人员详情',
    component: _import('proSupervisor/person/detail')
  }, {
    // 以下是商务主管的路由
    path: 'busSuperfeedback',
    name: '商务主管反馈',
    component: _import('busSupervisor/feedback/index')
  }, {
    path: 'busSuperPerson',
    name: '商务主管人员',
    component: _import('busSupervisor/person/index')
  }, {
    path: 'busSuperDynamic',
    name: '商务主管动态',
    component: _import('busSupervisor/dynamic/index')
  }, {
    path: 'busSuperRelease',
    name: '商务主管发布动态',
    component: _import('busSupervisor/dynamic/release')
  }, {
    path: 'busSuperfeedbackDetail',
    name: '商务主管反馈详情',
    component: _import('busSupervisor/feedback/detail')
  }, {
    path: 'busSuperpersonDetail',
    name: '商务主管人员详情',
    component: _import('busSupervisor/person/detail')
  }, {
    // 以下是普通业务员的路由
    path: 'follow',
    name: '业务员跟进',
    component: _import('business/follow/index')
  }, {
    path: 'followDetail',
    name: '业务员跟进详情',
    component: _import('business/follow/detail')
  }, {
    path: 'busDynamic',
    name: '业务员动态',
    component: _import('business/dynamic/index')
  }, {
    path: 'busRelease',
    name: '业务员发布动态',
    component: _import('business/dynamic/release')
  }, {
    // 以下是人事的路由
    path: 'perPerson',
    name: '人事人员',
    component: _import('personnel/person/index')
  }, {
    path: 'perDynamic',
    name: '人事动态',
    component: _import('personnel/dynamic/index')
  }, {
    path: 'perPersonDetail',
    name: '人事人员详情',
    component: _import('personnel/person/detail')
  }, {
    path: 'performance',
    name: '人事绩效',
    component: _import('personnel/performance/index')
  }, {
    path: 'access',
    name: '人事考核',
    component: _import('personnel/access/index')
  }, {
    // 设计主管的路由
    path: 'assign',
    name: '分配',
    component: _import('superDesign/assign/index')
  }, {
    path: 'superDesPerson',
    name: '人员',
    component: _import('superDesign/person/index')
  }, {
    path: 'superDesPersonDetail',
    name: '人员详情',
    component: _import('superDesign/person/detail')
  }, {
    path: 'superDesDynamic',
    name: '动态',
    component: _import('superDesign/dynamic/index')
  }, {
    path: 'superDesRelease',
    name: '发布动态',
    component: _import('superDesign/dynamic/release')
  }]
}
stateRoute.push(mainRoute)
export default new Router({
  routes: stateRoute
})
