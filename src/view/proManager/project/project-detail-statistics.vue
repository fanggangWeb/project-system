<template>
  <!-- 详情-统计 -->
  <div class="second-container">
    <!-- 1数量 -->
    <div class="numbers">
      <!-- 1.1进度 -->
      <ul class="numbers-speed">
        <li class="now line">
          <p v-if="costShow">{{status.cost}}<i class="el-icon-view the-eye" @click="costShow=!costShow"></i></p>
          <p v-if="!costShow">******<i class="el-icon-view the-eye" @click="costShow=!costShow"></i></p>
          <span>目前成本</span>
        </li>
        <li class="pending line">
          <p>{{status.endTime}}</p>
          <span>预计时间</span>
        </li>
        <li class="delay">
          <p>{{status.delayTime}}</p>
          <span>延迟时间</span>
        </li>
      </ul>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="resultList" :stripe="true" style="width: 100%">  
        <el-table-column prop="businessCost" label="商务成本" align="center">
        </el-table-column>
        <el-table-column prop="designerCost" align="center" label="设计成本">
        </el-table-column>
        <el-table-column prop="developerCost" align="center" label="开发成本">
        </el-table-column>
        <el-table-column align="center" label="是否盈利">
          <template slot-scope="scope">
            <span>{{scope.row.isProfit == true ? '盈利': '亏损'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="resultCost" align="center" label="盈利/亏损金额">
        </el-table-column>
      </el-table>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="jobnumber" align="center" label="工号">
        </el-table-column>
        <el-table-column prop="position" align="center" label="岗位">
        </el-table-column>
        <el-table-column prop="department.name" align="center" label="所属部门">
        </el-table-column>
        <el-table-column prop="positive" align="center" label="转正情况">
          <template slot-scope="scope">
            <span>{{scope.row.positive == 1 ? '已转正': '未转正'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cost" align="center" label="花费">
        </el-table-column>
        <!-- <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <!-- <div class="project-paging">
      <el-pagination background layout="prev, pager, next" 
      :page-size="size" @current-change="handleCurrentChange"
      :current-page.sync="page"
      :total="totalElements">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
  import { mapGetters, mapMutations  } from 'vuex'
  const SUCCESS_OK = '200'
  import { statistics, memberCostList, projectResult } from '@/api/request'
  let vm
  export default {
    data() {
      return {
        project: {},
        staffList: [],
        page: 1,
        size: 10,
        totalElements: 0,
        costShow: false,
        status: {
          cost: '',
          endTime: '',
          delayTime: ''
        },
        currentTime: new Date(),
        currentdate: '',
        resultList: []
      }
    },
    filters: {
      translate: function (key, map) {
        return map[key]
      },
      nullToZero: function (key) {
        if (!key) {
          return 0;
        }
      }
    },
    mounted() {
      vm = this
      this._statistics()
      this._projectResult()
      this._memberCostList()
      this.getNowFormatDate()
      let date = new Date()
      vm.currentTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
   computed: {
      ...mapGetters(['getprojectId'])
    },
    methods: {
      ...mapMutations([]),
      // 获取项目统计数据
      _statistics () {
        const data = {
          projectId: this.getprojectId
        }
        statistics(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.status = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 获取项目的盈亏结果
      _projectResult () {
        projectResult({projectId: this.getprojectId}).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.resultList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      _memberCostList () {
        const data = {
          projectId: this.getprojectId
        }
        memberCostList(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.staffList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      handleCurrentChange () {},
      getNowFormatDate() {
        var date = new Date()
        var seperator1 = "-"
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
            month = "0" + month
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate
        // return currentdate;
        this.currentdate = currentdate
      }
    }
  }
</script>
<style lang="less" scoped>
  .second-container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow-x: hidden;
    background-color: #FAFBFC;
    /*数量*/
    .numbers {
      width: 100%;
      height: 280px;
      background-color: #fff;
      box-sizing: border-box;
      .numbers-speed {
        display: flex;
        flex-wrap: nowrap;
        height: 240px;
        li {
          text-align: center;
          flex: 1;
          img {
            vertical-align: middle;
          }
          p {
            font-size: 26px;
            height: 28px;
            margin-top: 80px;
            color: #676767;
            .the-eye {
              position: relative;
              top: -6px;
              left: 20px;
            }
          }
          span {
            display: inline-block;
            font-size: 16px;
            color: #ABABAB;
            box-sizing: border-box;
            padding-left: 14px;
            margin-top: 80px;
            background: url("../../../assets/project-statistics-slices/projectNumber.png") no-repeat 0 2px;
          }
        }
        .pending {
          span {
            background: url("../../../assets/project-statistics-slices/haveInHand.png") no-repeat 0 2px;
          }
        }
        .delay {
          span {
            background: url("../../../assets/project-statistics-slices/deadline.png") no-repeat 0 2px;
          }
        }
        .line:after {
          content: '';
          position: relative;
          left: 180px;
          display: inline-block;
          height: 80px;
          width: 2px;
          background-color: #F8F8F8;
        }
      }
    }
    .project-table {
      padding: 20px 20px 20px 20px;
      background: white;
      max-height: 430px;
      overflow-y: auto;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 0 16px;
    }
  }
</style>
