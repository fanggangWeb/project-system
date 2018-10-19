<template>
  <div class="container">
    <div class="header">
      首页 > 绩效
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="人员搜索" v-model="personName" @change="nameSearch" clearable>
          </el-input>
          <!-- <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a> -->
        </div>
        <el-select style="width:130px;margin-left:20px;" @change="departSearch" v-model="departmentId" clearable placeholder="选择部门">
          <el-option v-if="item.name" v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select style="width:130px;margin-left:20px;" @change="positionSearch" v-model="position" clearable placeholder="岗位筛选">
          <el-option v-if="item" v-for="(item,index) in positionList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-date-picker
          style="margin:0 20px;width:150px;"
          v-model="searchTime"
          type="date"
          value-format="yyyy-MM-dd"
          @change="timeQuery"
          placeholder="考核时间">
        </el-date-picker>
        <el-button type="primary" @click="exportExecl" style="margin-right:20px">导出表格</el-button>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="userInfo.department.name" align="center" label="所属部门">
        </el-table-column>
        <el-table-column prop="userInfo.name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="userInfo.position" align="center" label="岗位">
        </el-table-column>
        <el-table-column prop="userInfo.salaryMonth" align="center" label="薪资">
        </el-table-column>
        <el-table-column prop="examineTime" align="center" label="考核时间">
        </el-table-column>
        <el-table-column prop="performance" align="center" label="绩效">
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
  import { allPosition, allDepartment, performanceList, exportPerformance } from '@/api/request'
  export default {
    data() {
      return {
        followList: [],
        projectStatus: '',
        page: 1,
        size: 10,
        searchTime: '',
        position: '',
        staffList: [],
        positionList: [],
        departmentList: [],
        departmentId: '',
        status: {},
        totalElements: 10,
        personName: '',
        showState: false,
        fileList: [], //上传文件列表
        uploadUrl: this.api + '/projectsPlanNew/uploadFile',
        downUrl: ''
      }
    },
    mounted() {
      this._allPosition()
      this._allDepartment()
      this._performanceList()
    },
    methods: {
      ...mapMutations(['projectId']),
      handleSuccess (response, file, fileList) {
        console.log(response)
      },
      handleError (err, file, fileList){
        this.MessageError('上传附件失败')
      },
      // 获取所有绩效的列表
      _performanceList () {
        const data = {
          name: this.personName,
          page: this.page,
          size: this.size,
          position: this.position,
          departmentId: this.departmentId,
          examineTime: this.searchTime
        }
        performanceList(data).then(res => {
          res = res.data
          console.log(res)
          if (res.state == SUCCESS_OK) {
            this.staffList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }

        })
      },
      // 获取所有岗位的列表
      _allPosition () {
        allPosition().then(res => {
          res = res.data
          // console.log(res)
          if (res.state = SUCCESS_OK) {
            this.positionList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 获取所有部门的列表
      _allDepartment () {
        let data = {
          page: 1,
          size: 100
        }
        allDepartment(data).then(res => {
          res = res.data
          // console.log(res)
          if (res.state = SUCCESS_OK) {
            this.departmentList = res.data.rows
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 导出员工的绩效表格
      exportExecl () {
        const data = {
          name: this.personName,
          page: this.page,
          size: this.size,
          position: this.position,
          departmentId: this.departmentId,
          examineTime: this.searchTime
        }
        exportPerformance(data).then(res => {
          let a = document.createElement('a')
          let url = window.URL.createObjectURL(new Blob([res.data]))
          a.href = url
          a.download = 'staff.xls'
          a.click()
          a.remove()
        })
      },
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        this._performanceList()
      },
      timeQuery () {
        // console.log(this.searchTime)
        this.page = 1
        if (this.searchTime == null) {
          this.searchTime = ''
        }
        this._performanceList()
      },
      nameSearch () {
        this.page = 1
        this._performanceList()
      },
      departSearch () {
        this.page = 1
        this._performanceList()
      },
      positionSearch () {
        this.page = 1
        this._performanceList()
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
