<template>
  <!-- 详情-完成情况 -->
  <div>
    <div class="projectDetailsComplete" v-if="showState">
      <!-- 完成内容title -->
      <div class="complete-title">
        <span>{{currentMonth | toChineseMonth}} {{year}}</span>
        <el-button-group class="navBtn">
          <el-button @click="ToLastMonth" icon="el-icon-arrow-left"></el-button>
          <el-button @click="ToNextMonth" icon="el-icon-arrow-right"></el-button>
        </el-button-group>
      </div>
      <!-- 周一至周日 -->
      <div class="calendar">
        <div class="weekRow">
          <div class="weekCol">周一</div>
          <div class="weekCol">周二</div>
          <div class="weekCol">周三</div>
          <div class="weekCol">周四</div>
          <div class="weekCol">周五</div>
          <div class="weekCol">周六</div>
          <div class="weekCol">周日</div>
        </div>
        <div class="contentArea">
          <!--<div class="contentRow">-->
          <div class="contentCol" v-for="(date,index) in lastMonthCalendar" :style="'flex-order:'+index">
            <span class="dateSpan">{{date}}</span>
          </div>
          <div class="contentCol" v-for="(date,index) in thisMonthCalendar">
            <span class="dateSpan">{{date | keepDateOnly}}</span>
            <!-- <div class="taskRow" v-for="(subTask,i) in ProjectsCompleteInfo" v-if="subTask.estimatedEndTime === date">
              <el-button type="primary" v-if="subTask.state==1" @click="detailShow(subTask.estimatedEndTime)">详情</el-button>
            </div> -->
          </div>
          <div class="contentCol" v-for="(date,index) in nextMonthCalendar" :style="'flex-order:'+index">
            <span class="dateSpan">{{date}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="table projectDetailsComplete" v-if="!showState">
      <el-button @click="backCalender" type="primary">返回日历表</el-button>
      <el-table
        :data="tableData"
        :stripe="true"
        style="width: 100%">
        <el-table-column
          prop="principalName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tasksName"
          label="任务名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="creationTime"
          label="开始时间">
          <template slot-scope="scope">
            <span v-if="!scope.row.creationTime">无</span>
            <span v-if="scope.row.creationTime">{{scope.row.creationTime  | timestampToTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="estimatedEndTime"
          label="结束时间">
          <template slot-scope="scope">
            <span v-if="!scope.row.estimatedEndTime">无</span>
            <span v-if="scope.row.estimatedEndTime">{{scope.row.estimatedEndTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="任务状态">
          <template slot-scope="scope">
            <span v-if="!scope.row.status">无</span>
            <span v-if="scope.row.status">{{ scope.row.status | translate(statusList) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="priority"
          label="优先级">
          <template slot-scope="scope">
           <span v-if="!scope.row.priority">无</span>
            <span v-if="scope.row.priority">{{ scope.row.priority | translate(priorityList) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="verifierName"
          label="审核人名字"
          width="180">
            <template slot-scope="scope">
              <span v-if="!scope.row.verifierName">无</span>
              <span v-if="scope.row.verifierName">{{scope.row.verifierName}}</span>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import common from "../../../utils/common"
  import { mapGetters,mapMutations  } from 'vuex'
  let vm;
  export default {
    name: "projectComplete",
    data() {
      return {
        showState: true,
        tableData: [],
        today: new Date(),
        currentMonth: 0,
        lastMonthCalendar: [],
        nextMonthCalendar: [],
        thisMonthCalendar: [],
        calendar: [],
        // projectsId: sessionStorage.projectId,
        ProjectsCompleteInfo: [],
        subTask: {
          principalName: '',
          subtaskName: '',
          status: '',
        },
        priorityList:{
          'LEVEL_LOW':'低',
          'LEVEL_GENERAL':'普通',
          'LEVEL_HIGH':'高',
        },
        statusList: {
          'CONDUCTING': '进行中',
          'FINISH': '已完成',
          'NOT_FINISH': '未完成',
          'STOPPING': '暂停中',
          'AUDITING': '审核中'
        },
        year : 0,
      }
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    filters: {
      translate: function (key, map) {
        return map[key]
      },
      nullToZero: function (key) {
        if (!key) {
          return 0
        }
      },
      // 时间戳转为时间
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        // var h = date.getHours() + ':';
        // var m = date.getMinutes() + ':';
        // var s = date.getSeconds();
        return Y + M + D;
      },
      keepDateOnly(date) {
        let array = date.split('-');
        return array[2];
      },
      toChineseMonth(month) {
        let chineseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        return chineseNumbers[month - 1] + '月'
      },
    },
    mounted() {
      vm = this;
      vm.year = vm.today.getFullYear();
      vm.currentMonth = vm.today.getMonth() + 1;
      vm.getCalendar();
      // vm.getProjectsCompleteInfo();
    },
    computed: {},
    methods: {
      detailShow (estimatedEndTime) {
        this.showState = false
        const data = {
          dateStr:estimatedEndTime,
          projectsId: this.$store.state.projectId
        }
        vm.axios.post(vm.urlApi.getProjectsCompleteInfoDetails, data).then(res => {
          if (res.code == 0) {
            // console.log(res)
            this.tableData = res.data
          }
        })
      },
      backCalender () {
        this.showState = true
      },
      resetCalendar(){
          vm.lastMonthCalendar = [];
          vm.nextMonthCalendar = [];
          vm.thisMonthCalendar = [];
      },
      ToNextMonth() {
        if(vm.currentMonth < 12){

          vm.currentMonth++;
        }else {
          vm.year += 1;
          vm.currentMonth = 1;
        }
        vm.resetCalendar();
        vm.getCalendar();
        // vm.getProjectsCompleteInfo();
      },
      ToLastMonth() {
        if(vm.currentMonth > 1){
          vm.currentMonth--;
        }else {
          vm.year -= 1;
          vm.currentMonth = 12;
        }
        vm.resetCalendar();
        vm.getCalendar();
        // vm.getProjectsCompleteInfo();
      },
      // 获取日历
      getCalendar() {
        let month = vm.currentMonth < 10 ? '0' + vm.currentMonth : vm.currentMonth;
        let cal = common.timeHandle(vm.year + '-' + month);
        vm.calendar = cal;
        let lastMonthDay = cal.day - 1 >= 0 ? cal.day - 1 : 6;
        for (let i = cal.lastMonth; i >= (cal.lastMonth - lastMonthDay + 1); i--) {
          vm.lastMonthCalendar.unshift(i);
        }
        for (let j = 1; j <= cal.nextMonth; j++) {
          vm.nextMonthCalendar.push(j)
        }
        for (let k = 1; k <= cal.numberDay; k++) {
          k = k >= 10 ? k : '0' + k;
          let month = vm.currentMonth >= 10 ? vm.currentMonth : '0' + vm.currentMonth;
          let newDate = cal.year + '-' + month + '-' + k;
          vm.thisMonthCalendar.push(newDate);
        }
      },

      // 分页显示
      currentChange(month) {
        vm.currentMonth = month;
        vm.getProjectsCompleteInfo()
      },
      // 获取
      getProjectsCompleteInfo() {
        console.log(this.$store.state.projectId)
        let req = new Object();
        let month = vm.currentMonth >= 10 ? vm.currentMonth : '0' + vm.currentMonth;
        req.dateStr = vm.year + '-' + month;
        // req.projectsId = vm.getprojectId;
        req.projectsId = vm.$store.state.projectId
        vm.axios.post(vm.urlApi.getProjectsCompleteInfo, req).then(res => {
          console.log(res)
          if (res.code == 0) {
            vm.ProjectsCompleteInfo = res.data;
          }
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  .projectDetailsComplete {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 20px 30px;
    box-sizing: border-box;
    overflow: auto;
    background-color: #FFFFFF;
    .complete-title {
      display: flex;
      justify-content: center;
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 26px;
      color: rgba(103, 103, 103, 1);
      .navBtn {
        position: absolute;
        right: 0;
      }
    }
    .calendar {
      display: flex;
      flex-direction: column;
      width: 100%;
      .weekRow {
        display: flex;
        width: 100%;
        height: 44px;
        line-height: 44px;
        margin-top: 44px;
        .weekCol {
          flex-grow: 1;
          text-align: center;
        }
      }
      .contentArea {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin: 0 1%;
        background: #FAFAFA;
        opacity: 0.6;
        .contentCol {
          display: flex;
          flex-direction: column;
          width: calc(100% / 7);
          align-items: center;
          min-height: 90px;
          padding: 10px 0;
          box-sizing: border-box;
          text-align: right;
          border: 1px solid #F6F6F6;
          .dateSpan {
            margin-right: 10px;
          }
          .taskRow {
            display: flex;
            text-align: center;
            flex-wrap: wrap;
            min-height: 30px;
            line-height: 30px;
            margin-top: 7px;
            span {
              color: #000000;
            }
            .statusSpan {
              color: lawngreen;
            }
          }
        }
      }
    }
  }
</style>
