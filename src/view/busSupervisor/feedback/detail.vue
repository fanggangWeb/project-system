<template>
  <div class="container">
    <div class="header">
      <router-link to="#">首页&nbsp;></router-link>
      <router-link to="/home/busSuperFeedback">&nbsp;任务&nbsp;>&nbsp;</router-link>
      <router-link to="#">反馈详情</router-link>
      <el-date-picker class="timeSearch"
        v-model="searchTime"
        type="date"
        @change="timeSearch"
        value-format="yyyy-MM-dd"
        placeholder="项目开始日期">
      </el-date-picker>
    </div>
    <div class="content">
      <div class="top">
        <div class="name">项目名称：{{projectInfo.name}}</div>
        <div class="customer">项目客户：{{projectInfo.customer.customerName}}</div>
        <div class="customer">跟进人员：
          <span v-for="(item,index) in projectInfo.salesPersons" :key="index">&nbsp;{{item.name}}</span>
        </div>
      </div>
      <div class="center">
        <div class="text">联系电话：{{projectInfo.customer.customerMobile}}</div>
        <div class="text">客户公司：{{projectInfo.customer.corporationName}}</div>
        <div class="text">QQ号码：{{projectInfo.customer.qq}}</div>
        <div class="text">微信号码：{{projectInfo.customer.weixin}}</div>
        <div class="text">所属区域：{{projectInfo.customer.region}}</div>
        <div class="text">渠道来源：{{projectInfo.source}}</div>
        <div class="text">需求编号：{{projectInfo.demandNumber}}</div>
      </div>
      <div class="bottom">
        项目简介：{{projectInfo.demandDesc}}
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="list" style="width:100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="updateTime" label="跟进时间" width="180" align="center">
        </el-table-column>
        <el-table-column prop="record" label="跟进详情" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="project-paging">
      <el-pagination background layout="prev, pager, next" 
      :page-size="size" @current-change="handleCurrentChange"
      :current-page.sync="page"
      :total="totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  const SUCCESS_OK = '200'
  import { saleTaskDetail, saleTaskDetailList } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        page: 1,
        size: 10,
        searchTime: '',
        list: [{time: '2018-09-10', desc: ''}],
        status: {},
        totalElements: 10,
        projectInfo: {
          customer: {
            customerName: ''
          }
        },
      }
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    mounted() {
      this._saleTaskDetail()
      this._saleTaskDetailList()
    },
    methods: {
      ...mapMutations(['projectId']),
      _saleTaskDetail () {
        saleTaskDetail({id: this.getprojectId}).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.projectInfo = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      timeSearch () {
        if (this.searchTime == null) {
          this.searchTime = ''
        }
        this._saleTaskDetailList()
      },
      _saleTaskDetailList () {
        const data = {
          page: this.page,
          size: this.size,
          saleTaskId: this.getprojectId,
          cheduleTime: this.searchTime
        }
        saleTaskDetailList(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.list = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      handleCurrentChange () {
        this._saleTaskDetail()
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    background: #fafbfc;
    .header {
      height: 70px;
      line-height: 70px;
      background: #f4f6f7;
      font-size: 22px;
      color: #4d4d4d;
      padding-left: 30px;
      display: flex;
      .timeSearch {
        margin-left: auto;
        margin-right: 20px;
      }
      .addProject {
        width: 108px;
        height: 40px; // align-self: center;
        margin-left: 20px;
        margin-right: 54px;
        margin-top: 5px; // background-color: #45B68C;
        // cursor: pointer;
      }
    }
    .content {
      padding: 20px;
      width: 100%;
      box-sizing: border-box;
      color: rgb(144, 147, 153);
      .top {
        background: white;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        color: #4d4d4d;
      }
      .name {
        float: left;
      }
      .customer {
        float: right;
        margin-left: 20px;
      }
      .center {
        background: white;
        padding: 0 20px;
        .text {
          height: 32px;
          line-height: 32px;
          display: inline-block;
          width: 33%;
        }
      }
      .bottom {
        line-height: 30px;
        padding: 10px 20px;
        background: white;
      }
    }
    .project-table {
      padding: 0px 20px 0 20px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 20px 0 20px;
    } // .addProject:hover{
    //   opacity: .85;
    //   transition: .2s;
    // }
  }
</style>
