<template>
  <div class="container">
    <div class="header">首页&nbsp;>&nbsp;审批&nbsp;>&nbsp;任务完成详情</div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="taskList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="module" label="功能模块">
        </el-table-column>
        <el-table-column prop="func" label="功能">
        </el-table-column>
        <el-table-column prop="principal" label="负责人">
        </el-table-column>
        <el-table-column prop="time" label="时间">
        </el-table-column>
        <el-table-column prop="state" label="完成情况">
        </el-table-column>
        <!-- <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="project-paging">
      <el-row>
        <el-col :span="2">
          <el-button type="success" size="small">通过</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="small">不通过</el-button>
        </el-col>
        <el-col :offset="5" :span="8">
          <el-pagination background layout="prev, pager, next" 
            :page-size="size" @current-change="handleCurrentChange"
            :current-page.sync="page"
            :total="totalElements">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: "projectDetails",
    data() {
      return {
        taskList: [1,2], // 人员列表
        page: 1,
        size: 10,
        totalElements: 10
      }
    },
    computed: {
      ...mapGetters([])
    },
    watch: {
    },
    mounted() {
      vm = this
      console.log(this.$route)
    },
    methods: {
      ...mapMutations([]),
      searchByJob() {
        vm.selectPerson(vm.personId)
      },
      handleCurrentChange() {
        console.log(this.page)
      },
      // 获取下载模板
      downTem() {
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
      detailGo (item) {
        this.$router.push('')
      },
    },
    destroyed() {
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
    .header {
      height: 70px;
      line-height: 70px;
      background: #f4f6f7;
      font-size: 22px;
      color: #4d4d4d;
      padding-left: 30px;
      display: flex;
      align-items: center;
      a {
        color: #4d4d4d;
      }
      .addPlan {
        margin-left: auto;
      }
      .addCate {
        margin-right: 36px;
      }
    }
    .project-table {
      padding: 30px 16px 0 16px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 0 16px;
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>