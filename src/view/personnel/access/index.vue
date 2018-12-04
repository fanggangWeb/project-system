<template>
  <div class="container">
    <div class="header">
      首页 > 考核
      <div class="searchContent">
        <!-- <div class="searchProject">
          <el-input placeholder="人员搜索" v-model="personName" @change="conditionSearch" clearable>
          </el-input>
        </div>
        <el-select style="width:130px;margin-left:20px;" @change="conditionSearch" v-model="departmentId" clearable placeholder="选择部门">
          <el-option v-if="item.name" v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select style="width:130px;margin-left:20px;" @change="conditionSearch" v-model="position" clearable placeholder="岗位筛选">
          <el-option v-if="item" v-for="(item,index) in positionList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select> -->
        <el-date-picker
          style="margin:0 20px;width:150px;"
          v-model="startedTime"
          type="date"
          value-format="yyyy-MM-dd"
          @change="conditionSearch"
          placeholder="开始时间">
        </el-date-picker>
        <el-date-picker
          style="margin-right:20px;width:150px;"
          v-model="endedTime"
          type="date"
          value-format="yyyy-MM-dd"
          @change="conditionSearch"
          placeholder="结束时间">
        </el-date-picker>
        <el-button type="primary" @click="exportExecl" style="margin-right:20px">导出表格</el-button>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="principal.name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="principal.userRoster.dept" align="center" label="部门">
        </el-table-column>
        <el-table-column prop="name" align="center" label="任务名称">
        </el-table-column>
        <el-table-column prop="publishTime" align="center" label="任务发布时间">
        </el-table-column>
        <el-table-column prop="projectDailyTaskStatus.text" align="center" label="任务状态">
        </el-table-column>
        <el-table-column prop="cost" align="center" label="应扣工资">
        </el-table-column>
        <!-- <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
          </template>
        </el-table-column> -->
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
  const SUCCESS_OK = '200'
  import { mapGetters, mapMutations } from 'vuex'
  import { noCompleteTask, exportNoCompleteTask } from '@/api/request'
  export default {
    data() {
      return {
        page: 1,
        size: 10,
        searchTime: '',
        position: '',
        staffList: [],
        positionList: [],
        departmentList: [],
        departmentId: '',
        status: {},
        totalElements: 0,
        personName: '',
        showState: false,
        downUrl: '',
        startedTime: '',
        endedTime: ''
      }
    },
    mounted() {
      this._noCompleteTask()
    },
    methods: {
      ...mapMutations(['projectId']),
      _noCompleteTask () {
        const data = {
          page: this.page,
          size: this.size,
          startTime: this.startedTime,
          endTime: this.endedTime
        }
        noCompleteTask(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.staffList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 导出员工的绩效表格
      exportExecl () {
        const data = {
          page: this.page,
          size: this.size,
          startTime: this.startedTime,
          endTime: this.endedTime
        }
        exportNoCompleteTask(data).then(res => {
          let a = document.createElement('a')
          let url = window.URL.createObjectURL(new Blob([res.data]))
          a.href = url
          a.download = '考核.xls'
          a.click()
          a.remove()
        })
      },
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        this._noCompleteTask()
      },
      conditionSearch () {
        // console.log(this.searchTime)
        this.page = 1
        this._noCompleteTask()
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
      justify-content: space-between;
      .searchContent {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        /*border: 1px solid;*/
        .searchProject {
          position: relative;
          .searchInput {
            width: 200px;
            height: 38px;
            vertical-align: middle;
            padding-left: 10px;
            border: 1px solid #cccccc;
            border-radius: 3px;
          }
          i {
            vertical-align: middle;
            position: absolute;
            top: 36%;
            right: 10px;
          }
        }
        .searchProject {
          width: 130px;
        }
        .selectChoose {
          width: 130px;
          margin-left: 30px;
          margin-right: 20px; 
        }
      }
      .not_current {
        color: #848484;
      }
      .current {
        color: #676767;
      }
      .addProject {
        // width: 108px;
        height: 40px; // align-self: center;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 5px; // background-color: #45B68C;
        // cursor: pointer;
      }
    }
    .project-table {
      padding: 30px 16px 0 16px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 0 16px;
    } // .addProject:hover{
    //   opacity: .85;
    //   transition: .2s;
    // }
  }
</style>
