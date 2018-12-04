<template>
  <div class="container">
    <div class="header">
      <router-link to="#">首页&nbsp;&gt;</router-link>
      <router-link to="#">动态</router-link>
      <el-button class="btn-publish" type="success" @click="toRelease">发布动态</el-button>
    </div>
    <div class="indexContent">
      <div class="navigation pull-left">
        <div class="time-display">
          <div class="block diplay-none">
            <el-date-picker v-model="timeValue" type="daterange" @change="timeQuery()" value-format="yyyy-MM-dd" range-separator="|" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="navigation-body">
          <div class="dynamic-search">
            <i class="el-icon-search"></i>
            <input type="text" @change="subSearch" v-model="searchName" placeholder="搜索动态"/>
          </div>
          <div class="line"></div>
          <div class="catalog">
            <ul>
              <li v-for="(item,index) in tabList" :key="item.value" @click="changeTab(item,index)">
                <span :class="{active:index == currentSelect}">{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-display pull-left">
        <div v-if="showState" class="CompanyIndex">
          <div class="header">
            <div class="header-title pull-left">
              {{typeName}}
              <span>(共{{total}}条动态,
                <span style="color:#45B78D">未读&nbsp;</span>{{noRead}}
                )</span>
            </div>
          </div>
          <!-- 今天 -->
          <div v-if="adviceList.length > 0" class="company-content">
            <div class="content-title">
              未读通知
              <span>({{noRead}})</span>
            </div>
            <div class="content-body">
              <table>
                <tr v-for="item in adviceList" :key="item.id">
                  <td class="company-col-1">
                    <img src="../../../assets/xiaoxi1.png" v-if="item.status == 0">
                    <img src="../../../assets/xiaoxi2.png" v-if="item.status == 1">
                    <!-- <img src="../../../assets/xiaoxi1.png"> -->
                  </td>
                  <td class="company-col-2">发送人:{{item.publisher.name}}</td>
                  <td class="company-col-3" @click="detail(item)">
                    <div class="div1">
                      {{item.title}}
                    </div>
                  </td>
                  <!-- <td class="company-col-4">今天{{item.createTime | showDate}}</td> -->
                  <td class="company-col-4">{{item.createTime}}</td>            
                </tr>
              </table>
            </div>
          </div>
          <!-- 分页 -->
          <div class="company-pag">
            <el-pagination
              background
              @current-change="handle"
              :page-size="size"
              :current-page="page"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
        <div v-if="!showState" class="index">
          <div class="head">{{typeName}}
          </div>
          <div class="content">
            <div class="title-con">
              <a class="title">{{adviceInfo.title}}</a>
              <span><a style="padding-right: 50px">发送人：{{adviceInfo.publisher.name}}</a><a>发送时间：{{adviceInfo.createTime}}</a></span>
            </div>
            <hr style="margin-top: 5px;border: 1px rgba(237,237,237,1) solid" />
            <div class="text">{{adviceInfo.body}}</div>
            <hr style="margin-top: 5px;border: 1px rgba(237,237,237,1) solid" />
          </div>
          <div class="foot">
            <!-- <span v-if="nextStatus !== '没有下一条了'" @click="next()">下一条{{nextStatus | readStatus}}：{{nextTitle}}</span>
            <span v-if="nextStatus === '没有下一条了'">下一条:{{nextStatus}}</span>
            <span>
                <a href="" style="padding-right: 17px" @click.prevent="prev" v-if="isFirst>0">上一条</a>
                <a  href=""  @click.prevent="next"  v-if="isLast>0">下一条</a>
              </span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { dynamicList, adviceDetail } from '@/api/request'
  const SUCCESS_OK = '200'
  let vm
  export default {
    data() {
      return {
        currentSelect: 0,
        // listOrDetail: sessionStorage['listOrDetail'],
        noRead: 0,
        timeValue: [],
        timeSearch: [],
        searchName: '',
        typeName: '公司动态',
        typeValue: 0,
        adviceList: [],
        saveId: '',
        showState: true,
        tabList: [{name:'公司动态',value: 0}, {name:'项目动态',value: 1}, {name:'人员动态',value: 2}],
        page: 1,
        size: 10,
        total: 10,
        adviceInfo: {},
      }
    },
    computed: {
      ...mapGetters([])
    },
    mounted() {
      vm = this
      this._dynamicList()
    },
    methods: {
      ...mapMutations([]),
      toRelease () {
        this.$router.push({path: '/home/superDesRelease'})
      },
      // 查询未读信息数量
      checkMsg() {
      },
      // 关键字搜索
      subSearch() {
        this.page = 1
        this._dynamicList()
        this.showState = true
      },
      ...mapMutations(['adviceId']),
      // 根据动态类型查询
      _dynamicList () {
        const data = {
          page: this.page,
          size: this.size,
          type: this.typeValue,
          title: this.searchName,
        }
        if (this.timeValue == null) {
          data.startTime = ''
          data.endTime = ''
        } else {
          data.startTime = this.timeValue[0]
          data.endTime = this.timeValue[1]
        }
        dynamicList(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.adviceList = res.data.rows
            this.total = res.data.total
            this.noRead = res.data.notRead
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 点击变成当前页
      handle () {
        console.log(this.refs.pagination)
      },
      changeTab (item, index) {
        this.typeValue = item.value
        this.currentSelect = index
        this.typeName = item.name
        this._dynamicList()
        this.showState = true
      },
      detail (item) {
        this.saveId = item.id
        this._adviceDetail()
        this.showState = false
      },
      _adviceDetail () {
        adviceDetail({id: this.saveId}).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.adviceInfo = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 选择时间
      timeQuery () {
        this.page = 1
        this.showState = true
        this._dynamicList()
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
      text-align: left;
      .btn-publish {
        float: right;
        margin-top: 20px;
        margin-right: 20px;
      }
    }
    .indexContent {
      width: 100%;
      margin-top: 20px;
      height: calc(100% - 90px);
      overflow: auto;
      .navigation {
        height: 100%;
        width: 25%;
        text-align: center;
        .time-display {
          height: 60px;
          background: #fff;
          text-align: center;
          .block {
            padding: 10px 0 0 20px;
            .el-input__inner {
              border: 0;
              width: 100%;
              outline: none;
              background: #fff;
            }
          }
        }
        .navigation-body {
          margin-top: 10px;
          padding-top: 10px;
          height: calc(100% - 80px);
          background: rgba(255, 255, 255, 1);
          box-shadow: 6px 8px 10px rgba(162, 160, 160, 0.05);
          .dynamic-search {
            border: 1px solid #d7d7d7;
            background: rgba(244, 246, 247, 1);
            height: 46px;
            width: 80%;
            border-radius: 25px;
            margin-left: 10%;
            margin-bottom: 10px;
            i {
              cursor: pointer;
            }
            input {
              height: 44px;
              border: 0;
              font-size: 16px;
              background: rgba(244, 246, 247, 1);
              color: rgba(166, 166, 166, 1);
            }
            input:focus {
              outline: none;
            }
          }
          .line {
            width: 100%;
            height: 1px;
            background: #FAFBFC;
          }
          .catalog {
            font-size: 20px;
            letter-spacing: 1px;
            cursor: pointer;
            span {
              color: black;
              display: inline-block;
              height: 46px;
              width: 230px;
              text-align: center;
              line-height: 46px;
              border-radius: 40px;
              margin-top: 20px;
            }
            .active {
              color: white;
              background: #45B78D;
            }
          }
        }
      }
      .content-display {
        float: right;
        height: 100%;
        width: 73%;
        .CompanyIndex {
          width: 100%;
          height: 100%;
          overflow: auto;
          text-align: left;
          .header {
            height: 55px;
            line-height: 55px;
            background: #f4f6f7;
            color: #767676;
            padding-left: 22px;
            overflow: hidden;
            .header-title {
              font-size: 20px;
              font-weight: bold;
              color: #767676;
            }
            .showNum {
              float: right;
            }
            .header-pag {
              padding-top: 10px;
              font-size: 15px;
              color: rgba(118, 118, 118, 1);
              margin-right: 34px;
              .el-pagination {
                display: flex;
                align-items: center;
                height: 30px;
                margin-top: 2px;
              }
            }
          }
          .company-content {
            padding-left: 23px;
            background: white;
            .content-title {
              font-size: 20px;
              line-height: 55px;
              color: #2C6EA2;
              border-bottom: 2px solid #acacac;
              span {
                font-size: 14px;
              }
            }
            .content-body {
              width: 100%;
              table {
                width: 100%;
                tr {
                  cursor: pointer;
                  td {
                    height: 59px;
                    line-height: 59px;
                    font-size: 16px;
                    border-bottom: 1px solid #E5E5E5;
                  }
                  .company-col-1 {
                    width: 3%;
                    img {
                      position: relative;
                      top: 1px;
                      width: 17px;
                      height: 14px;
                    }
                  }
                  .company-col-2 {
                    width: 20%;
                  }
                  .company-col-3 {
                    .div1 {
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      width: 220px;
                    }
                    cursor: pointer;
                    width: 50%;
                  }
                  .company-col-4 {
                    width: 20%;
                    padding-right: 30px;
                    text-align: right;
                  }
                }
              }
            }
          }
          .company-pag {
            text-align: center;
            margin: 20px 0;
          }
        }
        .index {
          width: 100%;
          height: 100%;
          overflow: auto;
          text-align: left;
          .head {
            width: 100%;
            background: #f4f6f7;
            font-size: 20px;
            font-weight: bold;
            color: rgba(118, 118, 118, 1);
            height: 55px;
            line-height: 55px;
            text-indent: 22px;
            span {
              float: right;
              margin-right: 22px;
              font-size: 16px;
              color: rgba(118, 118, 118, 1);
              line-height: 55px;
            }
          }
          .content {
            width: 100%;
            // height: calc(100% - 110px);
            height: calc(100% - 55px);
            background: rgba(255, 255, 255, 1);
            padding: 15px;
            padding-bottom: 481px;
            overflow-y: auto; 
            box-sizing: border-box;
            .title-con{
              height: 30px;
              line-height: 30px;
              .title {
                font-size: 18px;
                color: rgba(103, 103, 103, 1);
                line-height: 0px;
              }
            }
            span {
              float: right;
              margin-right: 46px;
              padding-top: 12px;
              font-size: 16px;
              color: rgba(118, 118, 118, 1);
              line-height: 0px;
            }
            .text {
              padding-top: 38px;
              padding-right: 10px;
              font-size: 16px;
              letter-spacing: 1px;
              color: rgba(118, 118, 118, 1);
              line-height: 27px;
            }
          }
          .foot {
            width: 100%;
            background: #f4f6f7;
            font-size: 16px;
            color: rgba(118, 118, 118, 1);
            line-height: 55px;
            text-indent: 10px;
            span:not(:first-child) {
              float: right;
              margin-right: 22px;
              font-size: 16px;
              color: rgba(118, 118, 118, 1);
              line-height: 72px;
            }
          }
        }
      }
    }
  }
  .pull-left{
    float: left;
  }
</style>
