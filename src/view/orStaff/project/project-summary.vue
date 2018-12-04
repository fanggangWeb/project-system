<template>
  <div class="second-container">
    <div class="task-right-two">
      <div class="detail">
        <div class="detail-row">
          <span class="keyword">项目名称：</span>
          <span class="value">{{projectBaseInfo.name}}</span>
        </div>
        <div class="detail-row">
          <span class="keyword">项目时间：</span>
          <span class="value">{{projectBaseInfo.startTime}} — {{projectBaseInfo.endTime}}</span>
        </div>
        <div class="detail-row">
          <span class="keyword">项目经理：</span>
          <span class="value">{{projectManager.userInfo.name}}</span>
        </div>
        <!-- <div class="detail-row">
          <span class="keyword">项目预算：</span>
          <span class="value">{{projectBudgetList.amount}}</span>
          <div class="row-right">
            <span class="keyword">项目奖金：</span>
            <span class="value">50000.00元</span>
          </div>
        </div> -->
        <!-- 附件列表 -->
        <!-- <div class="row-title annex">
          <div class="title">附件：</div>
          <div v-for="(item,index) in annexList" :key="index" class="annex-list">
            <span class="annex-value annex-name">蓝莓项目需求文档.doc</span>
            <span class="annex-value annex-size">(64kb)</span>
            <a class="annex-value annex-path">下载</a>
          </div>
        </div> -->
        <!-- 资料 -->
        <!-- <div class="description">
          <div class="title">项目简介：</div>
          <div class="desc">
            蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓 蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓 蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓蓝莓
          </div>
        </div> -->
        <!--开发里程碑  -->
        <div class="landmark">
          <div class="title">开发里程碑：</div>
          <div class="list">
            <div v-for="(item,index) in projectMilestoneList" :key="index" class="list-item">
              <div class="mark-title">{{item.name}}</div>
              <div class="content">
                <span>开始时间：{{item.startTime}}</span>
                <span>结束时间：{{item.endTime}}</span>
                <span>描述：{{item.detail}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import common from "../../../utils/common";
  const SUCCESS_OK = '200'
  import { proProjectDetail } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  let vm
  export default {
    data() {
      return {
        annexList: [],
        projectBaseInfo: {},
        projectBonusList: {},
        projectBudgetList: {},
        projectManager: {
          userInfo: {
            name: ''
          }
        },
        projectIntro: {},
        customer: {},
        projectMilestoneList: []
      }
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    mounted() {
      vm = this
      this._proProjectDetail()
    },
    methods: {
      _proProjectDetail () {
        proProjectDetail({id: this.getprojectId}).then(res => {
          res = res.data
          const data = res.data
          if (res.state == SUCCESS_OK) {
            // console.log(data)
            this.projectBaseInfo = data.projectBaseInfo
            this.projectBonusList = data.projectBonusList.pop()
            this.projectBudgetList = data.projectBudgetList.pop()
            this.projectManager = data.projectManager
            this.customer = data.customer
            this.projectIntro = data.projectIntro
            this.projectMilestoneList = data.projectMilestoneList
          } else {
            this.MessageError(res.message)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-input,
  .el-select {
    width: 15rem !important;
  }
  .second-container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    font-size: 16px;
    color: #000;
    background: white;
    padding-bottom: 30px;
    .task-right-two {
      // display: none;
      text-align: left;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      background: white;
      .detail {
        padding: 30px 20px 10px 30px;
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
          .row-right {
            position: absolute;
            display: inline-block;
            height: 100%;
            left: 400px;
          }
        }
        .description {
          width: 100%;
          .title {
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
              color: #7d7979;
              margin-right: 5px;
            }
            .annex-name {
              margin-left: 15px;
            }
            .annex-path {
              cursor: pointer;
            }
          }
          .desc {
            padding: 0 0 0 5px;
            line-height: 22px;
          }
        }
        .landmark{
          .title {
            height: 55px;
            line-height: 55px;
          }
          .list {
            .list-item{
              width: auto;
              height: 60px;
              margin-bottom: 10px;
              margin-left: 5%;
              border-bottom: 1px solid #f8f8f8;
              .mark-title {
                color: #4D85B5;
                height: 30px;
                line-height: 30px;
              }
              .content {
                height: 30px;
                line-height: 30px;
                span {
                  margin-right: 30px;
                  max-width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
