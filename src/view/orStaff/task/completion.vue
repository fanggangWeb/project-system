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
          <div class="contentCol" v-for="(date,index) in lastMonthCalendar" :key="date" :style="'flex-order:'+index">
            <span class="dateSpan">{{date}}</span>
          </div>
          <div class="contentCol" v-for="date in thisMonthCalendar" :key="date">
            <span class="dateSpan">{{date | keepDateOnly}}</span>
            <div class="taskRow" v-for="(task,index) in projectsCompleteInfo" :key="index" v-if="task.taskDate === date">
              <el-button type="primary" size="small" v-if="task.hasTask==true" @click="detailShow(task)">{{task.message}}</el-button>
            </div>
          </div>
          <div class="contentCol" v-for="(date,index) in nextMonthCalendar" :key="date" :style="'flex-order:'+index">
            <span class="dateSpan">{{date}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="table projectDetailsComplete" v-if="!showState">
      <el-button @click="backCalender" type="primary">返回日历表</el-button>
      <el-table :data="tableData" :stripe="true" :span-method="objectSpanMethod" style="width: 100%">
        <el-table-column prop="principal.name" align="center" label="姓名">
        </el-table-column>
        <el-table-column prop="name" align="center" label="任务名称">
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="开始时间">
          <!-- <template slot-scope="scope">
            <span v-if="!scope.row.createTime">无</span>
            <span v-if="scope.row.createTime">{{scope.row.createTime  | timestampToTime}}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="realEndTime" align="center" label="结束时间">
        </el-table-column>
        <el-table-column prop="workingTime" align="center" label="累计工时">
        </el-table-column>
        <el-table-column prop="cost" align="center" label="成本">
        </el-table-column>
        <el-table-column prop="principal.userStatus.text" align="center" label="人员状态">
        </el-table-column>
        <el-table-column prop="projectDailyTaskStatus.text" align="center" label="任务状态">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="submit(scope.row)">提交</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import common from "../../../utils/common"
  import { getCompleteDate, getCompleteInfo, commitTask } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  const SUCCESS_OK = '200'
  let vm
  export default {
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
        projectsCompleteInfo: [],
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
        var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
      vm = this
      this._getCompleteDate()
      vm.year = vm.today.getFullYear();
      vm.currentMonth = vm.today.getMonth() + 1;
      vm.getCalendar();
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    methods: {
      setTable() {
        let spanOneArr = [],
          spanTwoArr = [],
					concatOne = 0,
					concatTwo = 0
				this.tableData.forEach((item, index) => {
					if (index === 0) {
						spanOneArr.push(1);
						spanTwoArr.push(1);
					} else {
						if (item.serialNumber === this.tableData[index - 1].serialNumber) { //第一列需合并相同内容的判断条件
							spanOneArr[concatOne] += 1;
							spanOneArr.push(0);
						} else {
							spanOneArr.push(1);
							concatOne = index;
						};
					}
				});
				return {
					one: spanOneArr,
					two: spanTwoArr
				}
      },
      objectSpanMethod({
				row, //当前行
				column, //当前列
				rowIndex, //当前行号
				columnIndex //当前列号
			}) {
				if(	columnIndex === 0) { //第一列相同的合并
					const _row = (this.setTable(this.tableData).one)[rowIndex];
					const _col = _row > 0 ? 1 : 0;
					return {
						rowspan: _row,
						colspan: _col
					};
				}
      },
      submit (item) {
        commitTask({id: item.id}).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.MessageSuccess(res.message)
            this._getCompleteInfo()
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 获取反馈
      _getCompleteDate () {
        getCompleteDate({projectId: this.getprojectId}).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            // console.log(res)
            var hash = {}
            let arr = res.data.reduce(function (item, next) {
              hash[next.taskDate] ? '' : hash[next.taskDate] = true && item.push(next)
              return item
            }, [])
            this.projectsCompleteInfo = arr
          } else {
            this.MessageError(res.message)
          }
        })
      },
      detailShow (item) {
        this.time = item.taskDate
        this.showState = false
        this._getCompleteInfo()
      },
      _getCompleteInfo () {
        const data = {
          taskTime: this.time
        }
        getCompleteInfo(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            // console.log(res.data)
            this.tableData = res.data
          } else {
            this.MessageError(res.message)
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
        vm._getCompleteDate();
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
        vm._getCompleteDate();
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
        vm._getCompleteInfo()
      }
    }
  }
</script>
<style lang="less" scoped>
  .projectDetailsComplete {
    display: flex;
    flex-direction: column;
    width: 100%;
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
        // opacity: 0.6;
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
  .table {
    max-height: 680px;
    overflow-y: auto;
  }
</style>
