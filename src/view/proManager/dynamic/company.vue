<template>
  <div class="CompanyIndex">
    <div class="header">
      <div class="header-title pull-left">
        公司动态
        <span>(共{{total}}条动态，<span style="color:#45B78D">未读&nbsp;</span>{{trends.noRead}})</span>
      </div>
      <!-- <div class="header-pag pull-right">
        <el-pagination background layout="prev, next" :current-page="page" :total="total" :page-size="size" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <span class="showNum">{{page}}/{{total === 0 ? 1 : total}}</span> -->
    </div>
    <!-- 今天 -->
    <div v-if="today.length > 0" class="company-content">
      <div class="content-title">
        今天
        <span>({{today.length}})</span>
      </div>
      <div class="content-body">
        <table>
          <tr v-for="(item, index) in today" :key="index">
            <td class="company-col-1">
              <!-- <img src="../../../assets/xiaoxi1.png" v-if="item.whetherToRead === 'NO_READ'">
              <img src="../../../assets/xiaoxi2.png" v-if="item.whetherToRead === 'YES_READ'"> -->
              <img src="../../../assets/xiaoxi1.png">
            </td>
            <td class="company-col-2">发送人:{{item.dispatcherName}}</td>
            <td class="company-col-3" @click="jump('/home/dynamic/detail', item)">
              <div class="div1">
                {{item.content}}
              </div>
            </td>
            <!-- <td class="company-col-4">今天{{item.createTime | showDate}}</td> -->
            <td class="company-col-4">今天{{item.createTime}}</td>            
          </tr>
        </table>
      </div>
    </div>
    <!-- 昨天 -->
    <div v-if="yesterday.length > 0" class="company-content">
      <div class="content-title">
        昨天
        <span>({{yesterday.length}})</span>
      </div>
      <div class="content-body">
        <table>
          <tr v-for="(item,index) in yesterday" :key="index">
            <td class="company-col-1">
              <!-- <img src="../../../assets/xiaoxi1.png" v-if="item.whetherToRead === 'NO_READ'">
              <img src="../../../assets/xiaoxi2.png" v-if="item.whetherToRead === 'YES_READ'"> -->
              <img src="../../../assets/xiaoxi1.png">
            </td>
            <td class="company-col-2">发送人:{{item.dispatcherName}}</td>
            <td class="company-col-3" @click="jump('/home/dynamic/detail', item)">
              <div class="div1">
                {{item.content}}
              </div>
            </td>
            <!-- <td class="company-col-4">昨天{{item.createTime | showDate}}</td> -->
            <td class="company-col-4">昨天{{item.createTime}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 更早以前 -->
    <div v-if="beforeYesterday.length > 0" class="company-content">
      <div class="content-title">
        更早以前
        <span>({{beforeYesterday.length}})</span>
      </div>
      <div class="content-body">
        <table>
          <tr v-for="(item,index) in beforeYesterday" :key="index">
            <td class="company-col-1">
              <!-- <img src="../../../../assets/xiaoxi1.png" v-if="item.whetherToRead === 'NO_READ'">
              <img src="../../../../assets/xiaoxi2.png" v-if="item.whetherToRead === 'YES_READ'"> -->
              <img src="../../../assets/xiaoxi1.png">
            </td>
            <td class="company-col-2">发送人:{{item.dispatcherName}}</td>
            <td class="company-col-3" @click="jump('/home/dynamic/detail', item)">
              <div class="div1">
                {{item.title}}
              </div>
            </td>
            <!-- <td class="company-col-4">{{item.createTime | showDate}}</td> -->
            <td class="company-col-4">{{item.createTime}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="company-pag">
      <el-pagination background layout="prev, pager, next" :current-page="page" :total="total" :page-size="size" @current-change="handleCurrentChange" @prev-click="handleCurrentChange" @next-click="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  let vm
  import {
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        trends: {},
        today: [1,2],
        yesterday: [1,2,3,4,5,5,5,5,5,5,5,5,5,5,5,55,5,5,5,5],
        beforeYesterday: [1,2],
        whetherRead: 0,
        page: 1,
        size: 10,
        total: 10
      }
    },
    filters: {
      showDate(item) {
        let now = item.split(' ')[0]
        now = now.split('-')
        now = now[1] + '-' + now[2]
        return now
      }
    },
    mounted() {
      vm = this
    },
    methods: {
      ...mapMutations([]),
      // 根据动态类型查询
      dynamicAll() {
      },
      // 点击变成当前页
      handleCurrentChange(val) {
        // console.log(val)
      },
      jump (url,id) {
        this.$router.push({path: url})
      }
    }
  }
</script>

<style lang="less" scoped>
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
</style>

