<template>
  <div class="container">
    <div class="header">
      <router-link to='/home/task'>首页</router-link>&nbsp;>&nbsp;
      <router-link to="/home/approval">审批</router-link>&nbsp;>&nbsp;任务完成详情
      <!-- <el-input class="addPlan" placeholder="项目名称" clearable @change="nameSearch"  v-model="projectName">
      </el-input> -->
      <el-input  class="addPlan" placeholder="负责人名称" clearable @change="nameSearch" v-model="principalName">
      </el-input>
      <el-input placeholder="任务名称" clearable style="margin: 0 16px 0 20px;" @change="nameSearch" v-model="taskName">
      </el-input>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="taskList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="projectPlan.business" align="center" label="业务名称">
        </el-table-column>
        <el-table-column prop="projectPlan.module" align="center" label="模块名称">
        </el-table-column>
        <el-table-column prop="projectPlan.function" align="center" label="功能名称">
        </el-table-column>
        <el-table-column prop="text" align="center" label="描述">
        </el-table-column>
        <el-table-column prop="name" align="center" label="任务名称">
        </el-table-column>
        <el-table-column prop="principal.name" align="center" label="负责人">
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="开始时间">
        </el-table-column>
        <el-table-column prop="realEndTime" align="center" label="结束时间">
        </el-table-column>
        <el-table-column prop="workingTime" align="center" label="花费时间">
        </el-table-column>
        <el-table-column prop="cost" align="center" label="成本">
        </el-table-column>
        <el-table-column prop="projectDailyTaskStatus.text" align="center" label="状态">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button> -->
            <el-button type="danger" size="small" @click="refuse(scope.row)"> 不通过</el-button>
          </template>
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
  const SUCCESS_OK = '200'
  import { dayTaskList, refuseDayTask } from '@/api/request'
  export default {
    name: "projectDetails",
    data() {
      return {
        projectName: '',
        principalName: '',
        taskName: '',
        taskList: [], // 人员列表
        page: 1,
        size: 10,
        totalElements: 10
      }
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    watch: {
    },
    mounted() {
      vm = this
      this._dayTaskList()
    },
    methods: {
      ...mapMutations([]),
     nameSearch () {
        this.page = 1
        this._dayTaskList()
      },
      refuse (item) {
        this.$confirm('确认拒绝通过该日任务吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          refuseDayTask({id: item.id}).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._dayTaskList()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {})
      },
      _dayTaskList () {
        const data = {
          projectId: this.getprojectId,
          page: this.page,
          size: this.size,
          projectName: this.projectName,
          principalName: this.principalName,
          taskName: this.taskName
        }
        dayTaskList(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.taskList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      handleCurrentChange() {
        this._dayTaskList()
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
  .el-input {
    width: 140px !important;
  }
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
      cursor: pointer;
      a {
        color: #4d4d4d;
      }
      .addPlan {
        margin-left: auto;
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