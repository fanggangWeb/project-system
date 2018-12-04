<template>
  <div class="container">
    <div class="header">首页&nbsp;>&nbsp;<router-link to="/home/person">人员</router-link>&nbsp;>&nbsp;人员详情</div>
    <div class="nav">
      <span class="span icon_name">姓名：{{userInfo.name}}</span>
      <span class="span icon_user">岗位：{{userInfo.position}}</span>
      <span class="span icon_user">转正情况：{{userInfo.positive == 1?'已转正':'未转正'}}</span>
    </div>
    <div class="tables1">
      <table class="tables1_t">
        <tr>
          <td width="16%" class="td2">岗位</td>
          <td width="16%" class="td1">{{userInfo.position}}</td>
          <td width="16%" class="td2">本月出勤天数</td>
          <td width="16%" class="td1">{{attendance.attendanceDays}}</td>
          <td width="16%" class="td2">本月打卡次数</td>
          <td width="16%" class="td1">{{attendance.attendanceCount}}</td>
        </tr>
        <tr>
          <td class="td2">薪资</td>
          <td class="td1">{{userInfo.salaryMonth}}</td>
          <td class="td2">本月加班天数</td>
          <td class="td1">{{attendance.overTimeDays}}</td>
          <td class="td2">本月加班时长</td>
          <td class="td1">{{attendance.overTimeHours}}</td>
        </tr>
      </table>
    </div>
    <div class="tables2">
      <div class="project-content">
        <div class="project-top">
          <div class="project-top-up">{{statistics.participationCount}}</div>
          <div class="project-top-under"><img src="../../../assets/project-statistics-slices/projectNumber.png"> 本月参加任务</div>
        </div>
        <div class="project-top">
          <div class="project-top-up">{{statistics.finishCount}}</div>
          <div class="project-top-under"><img src="../../../assets/project-statistics-slices/haveInHand.png"> 本月完成任务</div>
        </div>
        <div class="project-top">
          <div class="project-top-up">{{statistics.notFinishCount}}</div>
          <div class="project-top-under"><img src="../../../assets/project-statistics-slices/complete.png"> 本月未完成任务</div>
        </div>
        <div class="project-top">
          <div class="project-top-up">{{statistics.notFinishCount*100}}%</div>
          <div class="project-top-under"><img src="../../../assets/project-statistics-slices/hangInTheAir.png"> 任务完成率</div>
        </div>
      </div>
      <div class="project-table">
        <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="taskList" :stripe="true" style="width: 100%">
          <el-table-column type="index" align="center" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="name" align="center" label="任务名称">
          </el-table-column>
          <el-table-column prop="startTime" align="center" label="开始时间">
          </el-table-column>
          <el-table-column prop="realEndTime" align="center" label="结束时间">
          </el-table-column>
          <el-table-column prop="projectName" align="center" label="所属项目">
          </el-table-column>
          <el-table-column prop="workingTime" align="center" label="花费时间">
          </el-table-column>
          <el-table-column prop="cost" align="center" label="成本">
          </el-table-column>
          <el-table-column prop="projectDailyTaskStatus.text" align="center" label="状态">
          </el-table-column>
        </el-table>
      </div>
        <!-- <div class="paging">
          <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="size" :total="total" @current-change="currentChange">
          </el-pagination>
        </div> -->
    </div>
  </div>
</template>

<script>
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  const SUCCESS_OK = '200'
  import { attendanceInfo, staffUserInfo, staffDaildyTask, orTaskStatistisc } from '@/api/request'
  export default {
    data() {
      return {
        userInfo: {},
        attendance: {},
        task: {},
        otherInfo: {},
        taskList: [],
        statistics: {},
        page: 1,
        size: 4,
        total: 0
      }
    },
    filters: {
      translate(item, map) {
        return map[item]
      }
    },
    mounted() {
      vm = this
      this._attendanceInfo()
      this._staffUserInfo()
      this._staffDaildyTask()
      this._orTaskStatistisc()
    },
    computed: {
      ...mapGetters(['getstaffId'])
    },
    methods: {
      ...mapMutations([]),
      // 出勤信息
      _attendanceInfo () {
        attendanceInfo({id: this.getstaffId}).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.attendance = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 个人信息
      _staffUserInfo () {
        staffUserInfo({id: this.getstaffId}).then(res => {
          res = res.data
          if (res.state = SUCCESS_OK) {
            this.userInfo = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 个人中心 任务统计
      _orTaskStatistisc () {
        orTaskStatistisc({userId: this.getstaffId}).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.statistics = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 任务列表
      _staffDaildyTask () {
        const data = {
          userId: this.getstaffId
        }
        staffDaildyTask(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.taskList = res.data
          } else {
            this.MessageError(res.message)
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
      height: 65px;
      width: calc(100% - 40px);
      line-height: 65px;
      text-align: left;
      margin: 10px 20px;
      color: #4D4D4D;
      font-size: 17px;
      box-sizing: border-box;
      .span {
        margin-right: 45px;
        padding-left: 20px;
      }
      .icon_name {
        margin-left: 35px;
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
          line-height: 90px;
          color:#848484;
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
      height: 54.2%;
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
          width: 20%;
          height: 150px;
          margin-right: 20px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          border-left: 1px #fff7f7 solid;
          box-shadow: 7px 12px 21px rgba(162, 160, 160, 0.05);
          .project-top-up {
            font-size: 60px;
            color: rgba(103, 103, 103, 1);
            line-height: 80px;
          }
          .project-top-under {
            font-size: 16px;
            color: rgba(171, 171, 171, 1);
            line-height: 60px;
            img {
              position: relative;
              top: 1px;
            }
          }
        }
        .project-top:first-child {
          margin-left: 30px;
        }
        .project-top:last-child {
          margin-right: 0px;
        }
      }
      .project-table {
        padding: 20px 30px 0px 30px;
        max-height: 300px;
        overflow-y: auto;
      }
    }
    .hr {
      margin-left: 55px;
    }
  }
</style>
