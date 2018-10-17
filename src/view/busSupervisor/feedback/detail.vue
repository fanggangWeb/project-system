<template>
  <div class="container">
    <div class="header">
      <router-link to="#">首页&nbsp;></router-link>
      <router-link to="/home/busSuperFeedback">&nbsp;任务&nbsp;>&nbsp;</router-link>
      <router-link to="#">反馈详情</router-link>
      <el-date-picker class="timeSearch"
        v-model="searchTime"
        type="date"
        placeholder="项目开始日期">
      </el-date-picker>
    </div>
    <div class="content">
      <div class="top">
        <div class="name">项目名称：蓝莓APP</div>
        <div class="customer">项目客户：某某某</div>
        <div class="customer">跟进人员：某某某</div>
      </div>
      <div class="bottom">
        测试昆仑山地方大事发生开发的是否打开拉萨附近昆仑山地方开了房间打扫理发师开发 发生的克劳福德罗斯福独守空房 士大夫昆仑山分解为哦分就爱上了对方开价
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="list" style="width:100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="time" label="跟进时间" width="180" align="center">
        </el-table-column>
        <el-table-column prop="desc" label="跟进详情">
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
  let vm
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
        projectName: '',
      }
    },
    mounted() {},
    methods: {
      ...mapMutations(['projectId']),
      handleCurrentChange() {
        console.log(this.page)
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
      }
      .name {
        float: left;
      }
      .customer {
        float: right;
        margin-left: 20px;
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
