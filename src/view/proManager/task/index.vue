<template>
  <div class="container">
    <div class="header">首页 > 任务</div>
    <div class="task-content">
      <div class="task-left">
        <div class="time-display">
          <div class="block diplay-none">
            <el-date-picker v-model="timeValue" type="daterange" @change="timeQuery()" value-format="yyyy-MM-dd" range-separator="|" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="project-display">
          <div class="project-title">
            <div class="title">任务列表</div>
            <!-- <div v-if="selState == 1" class="status-select" ref="statusSelect" @click="isProjectDisplay = !isProjectDisplay">
              <img src="../../../assets/status_select.png" v-if="projectType === '全部'" />
              <span v-if="projectType !== '全部'">测试</span>
            </div>
            <div class="status-list" ref="statusList" v-if="isProjectDisplay">
              <ul>
                <li v-for="(item,index) in status" :key="index">{{item}}</li>
              </ul>
            </div> -->
          </div>
          <!-- 计划列表 -->
          <div class="project-list">
            <div class="project-content" v-for="(item,index) in taskList" :key="index" @click="detailShow(item,index)" :class="{'current-display':index == current}">
              <div class="project-name"><img src="../../../assets/project_img.png" />测试</div>
              <!-- <div class="project-state project-details">
                <div></div>
                测试数据
              </div> -->
              <!-- <div class="project-time project-details">{{item.estimatedEndTime}}到期</div>-->
              <div class="project-time project-details">2018-9-29到期</div>          
              <!-- <div class="project-difficulty project-details">{{priority[item.priority]}}</div> -->
              <div class="project-difficulty project-details">高级</div>
              <img src="../../../assets/priority.png" class="priority"/>
            </div>
            <div>
              <el-button plain type="primary btn-w" v-if="isMore">加载更多</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 隐藏的第二个task-right -->
      <div class="task-right-two">
        <div class="detail">
          <div class="detail-row">
            <span class="keyword">项目名称：</span>
            <span class="value">蓝莓App</span>
          </div>
          <div class="detail-row">
            <span class="keyword">项目时间：</span>
            <span class="value">2018.01.02-2018.03.21</span>
          </div>
          <div class="detail-row">
            <span class="keyword">项目经理：</span>
            <span class="value">帅气小哥哥</span>
          </div>
          <div class="detail-row">
            <span class="keyword">项目预算：</span>
            <span class="value">1000000.00元</span>
            <div class="row-right">
              <span class="keyword">项目奖金：</span>
              <span class="value">50000.00元</span>
            </div>
          </div>
          <div class="detail-row">
            <span class="keyword">项目客户：</span>
            <span class="value">隔壁老王</span>
            <div class="row-right">
              <span class="keyword">联系电话：</span>
              <span class="value">13629719977</span>
            </div>
          </div>
          <!-- 附件列表 -->
          <div class="row-title annex">
            <div class="title">附件：</div>
            <div v-for="(item,index) in annexList" :key="index" class="annex-list">
              <span class="annex-value annex-name">蓝莓项目需求文档.doc</span>
              <span class="annex-value annex-size">(64kb)</span>
              <a class="annex-value annex-path">下载</a>
            </div>
          </div>
          <!-- 资料 -->
          <div class="row-title description">
            <div class="title">项目简介：</div>
            <div class="desc">
              蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓
              蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓
              蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let vm;
  // path:"home/task", // 项目经理任务页面
  import common from "@/utils/common";
  export default {
    data() {
      return {
        taskId: '', //大任务的id，默认为第一个
        timeValue: '', //选择时间
        projectType: '全部', //项目状态
        isProjectDisplay: false, //是否展示项目状态
        current: 0, //当前项目
        planList: [], // 计划数组列表
        functionDetailList: [],
        totalElements: '',
        taskList: [1,23,4,5,5,5,5,5,5,6,5,5,5,5,5],
        detail: [], //任务详情
        taskSubtasks: [], //任务详情子任务
        page: 1, //当前页数
        size: 10, //当前显示数据条数
        currentStatus: '', //项目状态
        isMore: true, //加载更多是否显示
        annexList: [1,2,3],
        files: new Array,
      }
    },
    mounted() {
      vm = this
    },
    methods: {
      timeQuery () {
        console.log(this.timeValue)
      },
      detailShow (item, index) {
        if (index) {
          vm.current = index
        } else {
          vm.current = 0
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    background: #FAFBFC;
    .header {
      height: 70px;
      line-height: 70px;
      background: #f4f6f7;
      font-size: 22px;
      color: #4d4d4d;
      padding-left: 30px;
      text-align: left;
    }
    .task-content {
      width: 100%;
      height: calc(100% - 80px);
      margin-top: 10px;
      /*详情*/
      .task-right-two {
        // display: none;
        text-align: left;
        width: 73%;
        float: right;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background: white;
        .detail {
          padding: 30px 20px 20px 20px;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          color: #AEAEAE;
          .detail-row {
            position: relative;
            width: 100%;
            height: 55px;
            line-height: 55px;
            border-bottom: 1px solid #f8f8f8;
            .keyword {
              letter-spacing: 1px;
            }
            .value {
              letter-spacing: 1px;
              color: #4D85B5;
            }
            .row-right{
              position: absolute;
              display: inline-block;
              height: 100%;
              left: 400px;
            }
          }
          .row-title {
            width: 100%;
            .title{
              height: 55px;
              line-height: 55px;
            }
            .annex-list {
              height: 30px;
              width: 100%;
              line-height: 30px;
              margin-bottom: 5px;
              font-size: 14px;
              background: #F9FAFC;
              .annex-value {
                display: inline-block;
                color:#7d7979;
                margin-right: 5px;
              }
              .annex-name {
                margin-left: 15px;
              }
              .annex-path {
                cursor: pointer;
              }
            }
            .desc{
              padding: 0 0 0 5px;
              line-height: 22px;
            }
          }
        }
      }
      /*详情*/
      .task-left {
        width: 25.7%;
        float: left;
        height: 100%;
        overflow: hidden;
        .time-display {
          height: 60px;
          background: #fff;
          text-align: center;
          .block {
            padding: 10px 0 0 20px;
            .el-input__inner {
              border: 0;
              outline: none;
              background: #fff;
            }
          }
        }
        .project-display {
          margin-top: 8px;
          background: #fff;
          // height: 690px;
          height: calc(100% - 60px);
          overflow: hidden;
          padding: 0 4px;
          .project-title {
            height: 55px;
            font-size: 18px;
            color: #a0a0a0;
            line-height: 55px;
            text-align: left;
            position: relative;
            border-top: 1px solid #f8f8f8;
            border-bottom: 1px solid #f8f8f8;
            .title {
              color:#45b7af;
              font-weight: bold;
              margin-left: 25px;
            }
            .approve-nav,
            .task-nav {
              color: #333;
              cursor: pointer;
              font-size: 15px;
              display: block;
              height: 65px;
              line-height: 65px;
              float: left;
            }
            .approve-nav {
              margin-left: 10px;
            }
            .approve-nav:hover,
            .task-nav:hover {
              color: #45b78d;
              transition: .2s;
            }
            .nav-active {
              color: #45b78d;
              border-bottom: 2px solid #45b78d;
            }
            .newly-build {
              width: 100px;
              height: 34px;
              float: right;
              background: #45b78d;
              margin: 14px 19px 0 0;
              cursor: pointer;
              font-size: 16px;
              color: #fff;
              line-height: 34px;
              text-align: center;
              border-radius: 5px;
            }
            .status-select {
              float: right;
              margin-right: 15px;
              cursor: pointer;
            }
            .status-list {
              width: 90px;
              background: #fff;
              border: 1px solid #ccc;
              line-height: 25px;
              font-size: 14px;
              position: absolute;
              top: 55px;
              right: -4px;
              z-index: 10;
              border-radius: 8px;
              text-align: center;
              li {
                border-bottom: 1px solid #ccc;
                cursor: pointer;
              }
            }
          }
          .project-list {
            max-height: calc(100% - 58px);
            // max-height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
          }
          .current-display {
            background: #f4f6f7;
          }
          .project-content {
            height: 100px;
            border-bottom: 1px solid #f8f8f8;
            border-radius: 2px;
            padding-left: 23px;
            position: relative;
            text-align: left;
            position: relative;
            cursor: pointer;
            .project-name {
              padding-top: 18px;
              color: #7d7979;
              font-size: 16px;
              img {
                position: relative;
                top: 2px;
                margin-right: 5px;
              }
            }
            .project-details {
              float: left;
              margin-top: 22px;
              height: 25px;
              border-radius: 2px;
              color: #fff;
              font-size: 14px;
              line-height: 25px;
            }
            .project-state {
              width: 75px;
              background: #45b78d;
              padding: 0 6px;
              div {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #fff;
                margin-right: 6px;
                display: inline-block;
              }
            }
            .project-time {
              width: 125px;
              margin-left: 5px;
              text-align: center;
              background: #45b7af;
            }
            .project-difficulty {
              width: 44px;
              margin-left: 5px;
              text-align: center;
              background: #ea5f6d;
            }
            .priority {
              position: absolute;
              top: 40px;
              right: 30px;
            }
          }
          .btn-w {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      }
    }
    .newly-build:hover,
    .project-state:hover,
    .project-time:hover,
    .project-difficulty:hover,
    .operation-button div:hover,
    .operation02-button div:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>
