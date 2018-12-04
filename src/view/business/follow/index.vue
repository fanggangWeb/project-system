<template>
  <div class="container">
    <div class="header">
      首页 > 跟进
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="项目名称" @change="nameSearch" v-model="projectName" clearable>
          </el-input>
          <!-- <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a> -->
        </div>
        <!-- <div class="selectChoose">
          <el-select v-model="projectStatus" clearable placeholder="跟进人员">
            <el-option v-for="item in followList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <el-date-picker
          style="margin:0 20px;"
          v-model="searchTime"
          type="date"
          @change="timeQuery"
          value-format="yyyy-MM-dd"
          placeholder="登记时间">
        </el-date-picker>
        <!-- <el-button class="addProject" type="success" @click="showState = true">添加</el-button> -->
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" align="center" label="项目名称">
        </el-table-column>
        <el-table-column prop="customer.customerName" align="center" label="客户名称">
        </el-table-column>
        <el-table-column prop="salesPersons" align="center" label="跟进人员">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.salesPersons" :key="index">
              {{item.name}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="cheduleCount" align="center" label="跟进次数">
        </el-table-column>
        <el-table-column prop="saleTaskStatusType.name" align="center" label="状态">
        </el-table-column>
        <el-table-column prop="createTime" align="center" label="创建时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" v-if="scope.row.saleTaskStatusType.id!=9" @click="complete(scope.row)">反馈</el-button>
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :close-on-click-modal="false" title="更改反馈状态" :visible.sync="showState" width="50%" center>
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <!-- <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="customer">
          <el-input v-model="form.customer" placeholder="请输入项目名称"></el-input>
        </el-form-item> -->
        <el-row>
          <el-col :offset="5" :span="12">
            <el-form-item style="font-size:16px;" label="更改状态" prop="statusTypeId">
              <el-select v-model="form.statusTypeId " clearable placeholder="选择更改状态">
                <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="项目简介" prop="desc">
          <el-input type="textarea" v-model="form.desc" placeholder="请输入项目简介"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="submit">提 交</el-button>
          <el-button @click="showState = false">取 消</el-button>
        </span>
    </el-dialog>
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
  import { followLists, updateTaskStatus, delTaskChedule } from '@/api/request'
  export default {
    data() {
      return {
        followList: [],
        projectStatus: '',
        page: 1,
        size: 10,
        searchTime: '',
        projectsList: [],
        status: {},
        totalElements: 10,
        projectName: '',
        showState: false,
        saveId: '',
        statusList: [
          {
            "id": 1,
            "name": "未联系上"
          },
          {
            "id": 2,
            "name": "已完成初次沟通"
          },
          {
            "id": 3,
            "name": "需求沟通阶段"
          },
          {
            "id": 4,
            "name": "首次报价"
          },
          {
            "id": 5,
            "name": "梳理详细需求"
          },
          {
            "id": 6,
            "name": "开始详细报价"
          },
          {
            "id": 7,
            "name": "详细报价已完成"
          },
          {
            "id": 8,
            "name": "商务洽谈中"
          },
          {
            "id": 9,
            "name": "已签约"
          },
          {
            "id": 10,
            "name": "放弃跟进"
          },
          {
            "id": 11,
            "name": "项目搁置阶段"
          }
        ],
        form: {
          statusTypeId: ''
        },
        rules: {
          statusTypeId:[{required: true, message: '请选择更改状态', trigger: 'blur'}]
        }
      }
    },
    watch: {
      showState: function (val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      }
    },
    mounted() {
      this._salesFollowList()
    },
    methods: {
      ...mapMutations(['taskId']),
      _salesFollowList () { // 业务员跟进列表
        let data = {
          projectName: this.projectName,
          page: this.page,
          size: this.size,
          registrationTime: this.searchTime
        }
        followLists(data).then(res => {
          res = res.data
          console.log(res)
          if (res.state == SUCCESS_OK) {
            this.totalElements = res.data.total
            this.projectsList = res.data.rows
          } else {
            this.MessageError('连接错误')
          }
        })
      },
      complete (item) {
        this.showState = true
        this.saveId = item.id
      },
      timeQuery () {
        this.page = 1
        if (this.searchTime == null) {
          this.searchTime = ''
        }
        this._salesFollowList()
      },
      handleSuccess (response, file, fileList) {
        console.log(response)
      },
      handleError (err, file, fileList){
        this.MessageError('上传附件失败')
      },
      detailGo (item) {
        this.taskId(item.id)
        this.$router.push({path: '/home/followDetail'})
      },
      nameSearch () {
        this.page = 1
        this._salesFollowList()
      },
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        this.salesFollowList()
      },
      // 提交表单
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let data = {
              taskId: this.saveId,
              statusTypeId: this.form.statusTypeId
            }
            updateTaskStatus(data).then(res => {
              res = res.data
              if (res.state == SUCCESS_OK) {
                this.MessageSuccess('更改状态成功')
                this.showState = false
                this._salesFollowList()
              } else {
                this.MessageError(res.message)
              }
            })
          } else {
            console.log('error submit!!');
            return false
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
