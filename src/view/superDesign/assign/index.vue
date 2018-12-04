<template>
  <div class="container">
    <div class="header">
      首页 > 分配
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
        <el-table-column prop="projectBaseInfo.name" align="center" label="项目名称">
        </el-table-column>
        <el-table-column prop="projectManager.userInfo.name" align="center" label="项目PM">
        </el-table-column>
        <el-table-column align="center" label="设计师">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.projectDesigners"  :key="index">
              {{item.userInfo.name}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="projectStatus.text" align="center" label="项目状态">
        </el-table-column>
        <el-table-column prop="projectBaseInfo.startTime" align="center" label="开始时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="assign(scope.row)">分配</el-button>
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
    <el-dialog :visible.sync="showState" :close-on-click-modal="false" width="50%" center>
      <el-row style="font-size:16px;line-height:25px;color:rgb(144, 147, 153)">
        <el-col :span="18">
          <span>项目名称：{{productName}}</span>
        </el-col>
        <el-col :span="6">
          <span>项目PM：{{productPM}}</span>
        </el-col>
      </el-row>
      <el-row style="font-size:16px;line-height:25px;margin-top:20px;color:rgb(144, 147, 153)">
        <el-col  :span="20">描述：{{productInfo}}</el-col>
      </el-row>
      <el-form :model="form" ref="form" :rules="rules" style="margin-top:20px;margin-left:25%;">
        <el-form-item label-width="130px" prop="designer" label="设计师:">
          <el-select v-model="form.designer" clearable placeholder="选择设计师">
            <el-option v-for="item in designerList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="130px" prop="startTime" label="开始时间:">
          <el-date-picker
            v-model="form.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="130px" prop="endTime" label="结束时间:">
          <el-date-picker
            v-model="form.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="submit">确 定</el-button>
        <el-button @click="showState = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  import { getPMList, allProject, allDesigner, insertDesigner } from '@/api/request'
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
        showState: false,
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
      assign (item) {
        this.productInfo = item.projectIntro.text
        this.productName = item.projectBaseInfo.name
        this.productPM = item.projectManager.userInfo.name
        this.saveId = item.id
        this.showState = true
      },
      del (item) {},
      nameSearch () {
        if (this.searchTime == null) {
          this.searchTime = ''
        }
        this.page = 1
        this._allProject()
      },
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const data = {
              projectId: this.saveId,
              endTime: this.form.endTime,
              startTime: this.form.startTime,
              userId: this.form.designer
            }
            insertDesigner(data).then(res => {
              res = res.data
              if (res.state == SUCCESS_OK) {
                this.MessageSuccess(res.message)
                this.showState = false
                this._allProject()
              } else {
                this.MessageError(res.message)
              }
            })
          } else {
            return false
          }
        })
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
