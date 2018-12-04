<template>
  <div class="container">
    <div class="header">
      首页 > 项目
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="搜索项目名称" v-model="projectName" @change="nameSearch" clearable>
          </el-input>
          <!-- <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a> -->
        </div>
        <el-select style="width:130px;margin-left:20px;" v-model="PMValue" @change="nameSearch" clearable placeholder="项目PM">
          <el-option v-for="item in PMList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          style="margin: 0 20px;width:160px"
          v-model="searchTime"
          value-format="yyyy-MM-dd"
          @change="nameSearch"
          type="date"
          placeholder="项目开始时间">
        </el-date-picker>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="porjectName" align="center" label="项目名称">
        </el-table-column>
        <el-table-column prop="userName" align="center" label="项目PM">
        </el-table-column>
        <!-- <el-table-column align="center" label="设计师">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.projectDesigners"  :key="index">
              {{item.userInfo.name}}
            </span>
          </template>
        </el-table-column> -->
        <el-table-column prop="text" align="center" label="项目状态">
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="开始时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detail(scope.row)">详情</el-button>
            <el-button type="success" size="small" @click="delivery(scope.row)">交付</el-button>
            <el-button type="info" size="small" @click="complete(scope.row)">完成</el-button>
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
  import { getPMList, allProject, allDesigner, deliveryProject, finishProject } from '@/api/request'
  const SUCCESS_OK = '200'
  export default {
    data() {
      return {
        PMList: [],
        PMValue: '',
        page: 1,
        size: 10,
        searchTime: '',
        projectsList: [],
        status: {},
        totalElements: 10,
        projectName: '',
        downUrl: '',
        productInfo: '',
        productName: '',
        productPM: '',
        designerList: [],
        form: {
          startTime: '',
          endTime: '',
          designer: ''
        },
        rules: {
          startTime:[{required: true, message: '请选择开始时间', trigger: 'blur'}],
          endTime:[{required: true, message: '请选择结束时间', trigger: 'blur'}],
          designer:[{required: true, message: '请选择设计人员', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this._getPMList()
      this._allDesigner()
      this._allProject()
    },
    methods: {
      ...mapMutations(['projectId']),
      del (item) {},
      nameSearch () {
        if (this.searchTime == null) {
          this.searchTime = ''
        }
        this.page = 1
        this._allProject()
      },
      detail (item) {
        this.projectId(item.id)
        this.$router.push('/home/superProjectDetail')
      },
      complete (item) {
        this.$confirm('确定改变该项目的状态吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          finishProject({id: item.id}).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._allProject()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {})
      },
      delivery (item) {
        this.$confirm('确定改变该项目的状态吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deliveryProject({id: item.id}).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._allProject()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {})
      },
      handleCurrentChange() {
        this._allProject()
      },
      _allProject () {
        const data = {
          name: this.projectName,
          page: this.page,
          size: this.size,
          projectManagerId: this.PMValue,
          startTime: this.searchTime
        }
        allProject(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.projectsList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      _getPMList () {
        getPMList().then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.PMList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      _allDesigner () {
        allDesigner().then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.designerList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
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
          i {
            vertical-align: middle;
            position: absolute;
            top: 36%;
            right: 10px;
          }
        }
        .searchProject {
          width: 160px;
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
    }
  }
</style>
