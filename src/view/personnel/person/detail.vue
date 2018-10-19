<template>
  <div class="container">
    <div class="header">首页&nbsp;>&nbsp;人员&nbsp;>&nbsp;人员详情</div>
    <div class="nav">
      <span style="margin-left:35px" class="span icon_user">姓名：柴方刚{{userInfo.name}}</span>
      <span class="span icon_user">岗位：IOS工程师</span>
      <span class="span icon_user">转正情况：已转正</span>
      <!-- <span class="span icon_user">转正情况：{{userInfo.entryStatus == 'POSITIVE'? '已转正':'未转正'}}</span> -->
      <!-- <el-button size="mini" type="success" v-if="userInfo.entryStatus != 'POSITIVE'">
        <router-link to="/changeStatus" class="color_white">修改</router-link>
      </el-button> -->
      <!-- <el-button size="mini" type="primary">
        <router-link to="/rating" class="color_white">评分</router-link>
      </el-button> -->
    </div>
    <div class="tables1">
      <table class="tables1_t">
        <tr>
          <td width="16%" class="td2">岗位</td>
          <td width="16%" class="td1">{{userInfo.position}}</td>
          <td width="16%" class="td2">本月出勤天数</td>
          <td width="16%" class="td1">{{attendance.attendanceDays}}</td>
          <td width="16%" class="td2">本月请假天数</td>
          <td width="16%" class="td1">{{attendance.casualLeaveDays}}</td>
        </tr>
        <tr>
          <td class="td2">薪资</td>
          <td class="td1">{{userInfo.salary}}</td>
          <td class="td2">本月加班天数</td>
          <td class="td1">{{attendance.overtimeNum}}</td>
          <td class="td2">本月加班时长</td>
          <td class="td1">{{attendance.overTime}}</td>
        </tr>
      </table>
    </div>
    <div class="tables2">
      <div class="project-content">
        <div class="project-top">
          <div class="project-top-up">100</div>
          <div class="project-top-under"><img src="../../../assets/project-statistics-slices/projectNumber.png"> 本月参加任务</div>
        </div>
        <div class="project-top">
          <div class="project-top-up">100</div>
          <div class="project-top-under"><img src="../../../assets/project-statistics-slices/haveInHand.png"> 本月收到任务</div>
        </div>
        <div class="project-top">
          <div class="project-top-up">100</div>
          <div class="project-top-under"><img src="../../../assets/project-statistics-slices/complete.png"> 本月完成任务</div>
        </div>
        <div class="project-top">
          <div class="project-top-up">100</div>
          <div class="project-top-under"><img src="../../../assets/project-statistics-slices/hangInTheAir.png"> 本月超期任务</div>
        </div>
      </div>
      <!-- <div class="hr">
        <hr width="90%" style="margin-top:15px;border:1px dashed #e3e3e3; height:1px">
      </div> -->
      <div class="task-sub">
        <table class="tables3">
          <thead>
            <tr class="tables3_tr">
              <td width="16%">任务名称</td>
              <td width="16%">开始时间</td>
              <td width="16%">结束时间</td>
              <td width="16%">所属项目</td>
              <td width="16%">优先级</td>
              <td width="16%">状态</td>
            </tr>
          </thead>
          <tbody>
            <tr class="tables3_tr">
              <tr v-for="(item,index) in subTask" :key="index">
                <td>{{item.tasksName}}</td>
                <td>{{item.startingTime}}</td>
                <td>{{item.estimatedEndTime}}</td>
                <td>{{item.projectName}}</td>
                <td>{{item.priority}}</td>
                <td>{{item.status}}</td>
              </tr>
          </tbody>
        </table>
        <div class="paging">
          <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="size" :total="total" @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let vm;
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        userInfo: new Object(),
        attendance: new Object(),
        task: new Object(),
        otherInfo: new Object(),
        subTask: new Array(),
        page: 1,
        size: 4,
        total: 10
      }
    },
    filters: {
      translate(item, map) {
        return map[item]
      }
    },
    mounted() {
      vm = this
      // vm.getPersonInfo()
      // vm.getThisMonthTasks()
    },
    computed: {
      // ...mapGetters(['getstaffId'])
    },
    methods: {
      ...mapMutations([]),
      // 获取人员信息(任务，考勤，基本信息)
      getPersonInfo() {
        let req = new Object();
        // req.userId = vm.id;
        req.userId = vm.getuserId
        vm.axios.post(vm.urlApi.getPersonInfo, req).then(res => {
          if (res.code == 0) {
            // console.log(res)
            vm.userInfo = res.data.userInfo;
            vm.task = res.data.task;
            vm.attendance = res.data.attendance;
            vm.entryStatus(vm.userInfo.entryStatus)
            vm.name(vm.userInfo.name)
            vm.position(vm.userInfo.position)
            vm.level(vm.userInfo.salaryLevel)
          }
        })
      },
      // 获取子任务信息
      getThisMonthTasks() {
        let req = new Object();
        req.page = vm.page;
        req.size = vm.size;
        req.userId = vm.getuserId;
        vm.axios.post(vm.urlApi.getThisMonthTasks, req).then(res => {
          // console.log(res)
          if (res && res.code === 0) {
            vm.subTask = res.data.content;
            vm.total = res.data.totalElements
          }
        })
      },
      currentChange(page) {
        vm.page = page
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .container {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    background: #FAFBFD;
    .header {
      color: #4d4d4d;
      font-size: 22px;
      line-height: 70px;
      text-align: left;
      padding-left: 30px;
      width: 100%;
      height: 70px;
      background: rgba(244, 246, 247, 1);
      box-sizing: border-box;
    }
    .nav {
      background: rgba(255, 255, 255, 1);
      width: calc(100% - 40px);
      line-height: 82px;
      text-align: left;
      margin: 10px 20px;
      color: #4D4D4D;
      font-size: 18px;
      box-sizing: border-box;
      .span {
        margin-right: 45px;
        padding-left: 20px;
      }
      .color_white {
        color: white;
      }
    }
    .tables1 {
      width: calc(100% - 40px);
      margin: 10px 20px;
      padding: 20px 0px;
      background: #ffffff;
      .tables1_t {
        width: 90%;
        margin-left: 44px;
        text-align: center;
        .td1 {
          background: #fcfcfc;
          border: 2px solid #f6f6f6;
          height: 90px;
        }
        .td2 {
          height: 100%;
          line-height: 90px;
          background: #f6f6f6;
          width: 10%
        }
      }
    }
    .tables2 {
      width: calc(100% - 40px);
      margin: 10px 20px;
      height: 50%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 7px 12px 21px rgba(162, 160, 160, 0.05);
      .project-content {
        padding: 10px 16px 0 16px;
        .project-top:not(:first-child) {
          margin-left: 2%;
        }
        .project-top {
          display: inline-block;
          text-align: center;
          width: 23.1%;
          height: 150px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          box-shadow: 7px 12px 21px rgba(162, 160, 160, 0.05);
          .project-top-up {
            font-size: 60px;
            color: rgba(103, 103, 103, 1);
            line-height: 80px;
          }
          .project-top-under {
            font-size: 16px;
            color: rgba(171, 171, 171, 1);
            line-height: 80px;
            img {
              position: relative;
              top: 1px;
            }
          }
        }
      }
      .tables3 {
        width: 100%;
        line-height: 41px;
        margin-left: 44px;
        text-align: center;
        margin-top: 41px;
        padding-top: 29rem;
        background: #f3f3f3;
        td {
          height: 50px;
          line-height: 50px;
          font-size: 14px;
        }
      }
    }
    .hr {
      margin-left: 55px;
    }
    .task-sub {
      // width:60% ;
      width: 90%;
      .paging {
        margin: 20px auto;
        text-align: center;
      }
    }
  }
</style>
