<template>
  <div class="second-container">
    <!-- <div class="header">
      <el-input class="addPlan" size="small" placeholder="人员搜索" style="margin-right:10px" v-model="personName">
      </el-input>
      <el-select  style="margin-right:10px" size="small" v-model="job" clearable placeholder="岗位筛选">
        <el-option v-for="(item, index) in jobList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </div> -->
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}" @selection-change="handleSelectionChange" :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="70%">
        </el-table-column>
        <el-table-column prop="projectBaseInfo.name" align="center" label="项目名称" style="width: 20%">
        </el-table-column>
        <el-table-column prop="projectBaseInfo.startTime" align="center" label="开始时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="projectBaseInfo.endTime" align="center" label="结束时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="projectStatus.text" align="center" label="状态" style="width: 20%">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
            <!-- <el-button type="success" size="small" @click="receive(scope.row)">领取</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="详情" :visible.sync="showState" width="60%" :close-on-click-modal="false" center>
      <div class="searchBar" style="margin-bottom:15px;">
        <el-select size="small" v-model="businessValue" @change="listSearch" clearable placeholder="业务名称搜索">
          <el-option v-for="(item, index) in businessList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-select size="small" v-model="moduleValue" @change="listSearch" clearable placeholder="模块名称搜索">
          <el-option v-for="(item, index) in moduleList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-select size="small" v-model="functionValue" @change="listSearch" clearable placeholder="功能名称搜索">
          <el-option v-for="(item, index) in functionList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="searchTime"
          type="date"
          size="small"
          @change="listSearch"
          value-format="yyyy-MM-dd"
          placeholder="开始时间搜索">
        </el-date-picker>
      </div>
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}" @selection-change="handleSelectionChange" :data="taskList" :stripe="true" style="width: 100%">
        <!-- <el-table-column type="selection" align="center" width="50">
        </el-table-column> -->
        <el-table-column prop="name" type="index" align="center" label="序号">
        </el-table-column>
        <el-table-column prop="business" align="center" label="业务名称">
        </el-table-column>
        <el-table-column prop="module" align="center" label="模块名称">
        </el-table-column>
        <el-table-column prop="function" align="center" label="功能名称">
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="开始时间">
        </el-table-column>
        <el-table-column prop="endTime" align="center" label="结束时间">
        </el-table-column>
        <el-table-column prop="detail" align="center" label="描述">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="receiveOne(scope.row)">领取</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="project-paging">
        <!-- <el-button type="success" size="small">领取</el-button> -->
        <el-pagination background layout="prev, pager, next" 
        :page-size="size1" @current-change="handleCurrentChange1"
        :current-page.sync="page1"
        :total="totalElements1">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showState = false">确定</el-button>
        <el-button @click="showState = false">取 消</el-button>
        </span>
    </el-dialog>
    <div class="project-paging">
      <!-- <el-button type="success" size="small">领取</el-button> -->
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
  import { staffProject, staffTask, receiveTask, orStaffSelectList } from '@/api/request'
  const SUCCESS_OK = '200'
  export default {
    data() {
      return {
        jobList: [],
        job: '',
        personName: '',
        otherUsers: [],
        showState: false,
        userId: '',
        projectsList: [], // 任务列表
        taskList: [],
        moduleState: false,
        searchTime: '',
        page: 1,
        size: 10,
        totalElements: 0,
        page1: 1,
        size1: 8,
        totalElements1: 0,
        saveId: '',
        businessValue: '',
        moduleValue: '',
        functionValue: '',
        options: [],
        businessList: [],
        moduleList: [],
        functionList: [],
        chooseModule: []
      }
    },
    computed: {
      ...mapGetters([])
    },
    mounted() {
      vm = this
      this._staffProject()
    },
    methods: {
      ...mapMutations([]),
      handleCurrentChange () {
        this._staffProject()
      },
      listSearch () {
        this._staffTask()
      },
      handleCurrentChange1 () {
        this._staffTask()
      },
      // 获取下拉框列表
      _orStaffSelectList (type) {
        const data = {
          selectType: type,
          projectId: this.saveId
        }
        orStaffSelectList(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            switch (type) {
              case 0:
                this.businessList = res.data
                break;
              case 1:
                this.moduleList = res.data
                break;
              case 2:
                this.functionList = res.data
              default:
                break;
            }
          } else {
            this.MessageError(res.message)
          }
        })
      },
      receiveOne (item) {
        const data = {
          projectPlanId: item.id
        }
        receiveTask(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.MessageSuccess('领取成功')
          } else {
            this.MessageError(res.message)
          }
        })
      },
      handleSelectionChange(val) {
        // console.log(val)
        this.chooseModule = val
      },
      detailGo (item) {
        this.saveId = item.id
        this.page1 = 1
        this.showState = true
        this._staffTask()
        this._orStaffSelectList(0)
        this._orStaffSelectList(1)
        this._orStaffSelectList(2)
        // this.$router.push('/home/staffDetail')
      },
      // 获取计划列表
      _staffTask () {
        const data = {
          page: this.page1,
          size: this.size1,
          projectId: this.saveId,
          business: this.businessValue,
          module: this.moduleValue,
          function: this.functionValue,
          startTime: this.searchTime
        }
        staffTask(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.taskList = res.data.rows
            this.totalElements1 = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 获取项目列表
      _staffProject () {
        const data = {
          page: this.page,
          size: this.size
        }
        staffProject(data).then(res => {
          res = res.data
          // console.log(res.data)
          if (res.state == SUCCESS_OK) {
            this.projectsList = res.data.rows
            this.totalElements = res.data.total
            // console.log(this.projectsList)
          } else {
            this.MessageError(res.message)
          }
        })
      },
      receiveAll (item) {
        if (this.chooseModule.length > 0) {

        } else {
          this.MessageError('请选取要领取的功能模块')
        }
      },
      jump(url, id) {
        vm.$router.push(url)
        vm.currentSelect = id
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .el-input {
    width: 140px !important;
  }
  .second-container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    background-color: white;
    .header {
      height: 70px;
      line-height: 70px;
      background: white;
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
      padding: 20px 20px 0 20px;
    }
    .project-paging {
      // text-align: center;
      .el-button{
        float: left;
      }
      padding: 20px 16px 15px 20px;
      .el-pagination {
        text-align: center;
      }
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>